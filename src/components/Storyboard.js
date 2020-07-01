import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../context/store';
import {
  Layout,
  InnerLayout,
  AddScene,
  AddIcon,
  Header,
  Title,
  Card,
  InnerCardLayout,
  TopSection,
  ExampleImage,
  CoreSection,
  FormGroup,
  InputTitle,
  Button,
  ImageOverlay,
  UploadIcon,
  SaveIcon,
  DeleteButton,
  DeleteIcon,
} from '../styles/singleStory';
import { useParams } from 'react-router-dom';
import { s3Upload } from '../libs/awsLib';
import { Storage } from 'aws-amplify';
import TextareaAutosize from 'react-textarea-autosize';
import { API } from 'aws-amplify';
import { CircleSpinner } from 'react-spinners-kit';
import '../styles/input-control.css';

export default function Storyboard(props) {
  const file = useRef(null);
  const dragItem = useRef(null);
  const dragNode = useRef(null);
  const deleteItem = useRef(null);
  const { id } = useParams();
  const blankScene = {
    storyId: `${id}`,
    imagePath: '',
    image: '',
    script: '',
    actions: '',
  };
  const [scenes, setScenes] = useState([{ ...blankScene }]);
  const [isLoading, setIsLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { store } = useContext(Context);

  useEffect(() => {
    let didCancel = false;

    function loadScenes() {
      return API.get('core', `/boards/${id}`);
    }

    async function getImages(sceneObj) {
      for (const [, scene] of sceneObj.entries()) {
        if (scene.image) {
          const thePath = await Storage.vault.get(scene.image);
          scene.imagePath = thePath;
        } else {
          scene.imagePath = null;
        }
      }
      return sceneObj;
    }

    async function onLoad() {
      if (!store.hasAuthenticated) {
        return;
      }
      try {
        const theScenes = await loadScenes();
        const initialObj = await getImages(theScenes);
        const finalObj = await initialObj.sort(function (a, b) {
          return a.idx - b.idx;
        });
        if (!didCancel) {
          setScenes(finalObj);
        }
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    }
    onLoad();
    return () => {
      didCancel = true;
    };
  }, [id, store.hasAuthenticated]);

  function addScene() {
    return setScenes([...scenes, { ...blankScene }]);
  }

  function handleDragStart(e, params) {
    console.log(params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  }

  function handleDragEnd() {
    console.log('drag ended');
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
  }

  function handleDragEnter(e, params) {
    console.log('Entered....', params);
    if (e.target !== dragNode.current) {
      console.log(dragItem.current);
      setScenes((oldScenes) => {
        let newScenes = JSON.parse(JSON.stringify(oldScenes));
        newScenes.splice(
          params.idx,
          0,
          newScenes.splice(dragItem.current.idx, 1)[0]
        );
        dragItem.current = params;
        console.log(newScenes);
        return newScenes;
      });
    }
  }

  function deleteBoard(id, storyId) {
    return API.del('core', `/board/${id}`, {
      body: { storyId },
    });
  }

  function reRenderScenes(id) {
    const updatedScenes = scenes.filter((scene) => scene.boardId !== id);
    setScenes(updatedScenes);
  }

  async function handleDelete(e, params) {
    e.preventDefault();
    deleteItem.current = params;
    console.log(deleteItem.current.scene.boardId);
    const confirmed = window.confirm(
      'Are you sure you want to delete this idea?'
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      if (deleteItem.current.scene.image) {
        await Storage.vault.remove(deleteItem.current.scene.image);
        await deleteBoard(
          deleteItem.current.scene.boardId,
          deleteItem.current.scene.storyId
        );
        reRenderScenes(deleteItem.current.scene.boardId);
        setIsDeleting(false);
      } else {
        await deleteBoard(
          deleteItem.current.scene.boardId,
          deleteItem.current.scene.storyId
        );
        reRenderScenes(deleteItem.current.scene.boardId);
        setIsDeleting(false);
      }
    } catch (e) {
      console.error(e);
      setIsDeleting(false);
    }
  }

  async function handleSceneChange(e) {
    e.persist();
    const updateScenes = [...scenes];
    try {
      if (e.target.className.split(' ')[0] === 'image' && e.target.files[0]) {
        file.current = e.target.files[0];
        if (updateScenes[e.target.dataset.idx].image) {
          console.log('replace image upload');
          await Storage.vault.remove(updateScenes[e.target.dataset.idx].image);
        }
        console.log('new image upload');
        const theImageShort = await s3Upload(file.current);
        const theImageLong = await Storage.vault.get(theImageShort);
        updateScenes[e.target.dataset.idx].image = theImageShort;
        updateScenes[e.target.dataset.idx].imagePath = theImageLong;
        setScenes(updateScenes);
      } else if (e.target.className.split(' ')[0] === 'script' || 'actions') {
        updateScenes[e.target.dataset.idx][e.target.className.split(' ')[0]] =
          e.target.value;
        setScenes(updateScenes);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSaveBoards(e) {
    e.preventDefault();
    setSaveLoading(true);
    for (const [idx, scene] of scenes.entries()) {
      if (!scene.boardId) {
        scene.idx = idx;
        await API.post('core', '/boards', {
          body: scene,
        });
      } else {
        scene.idx = idx;
        console.log(scene);
        await API.put('core', `/board/${scene.boardId}`, {
          body: scene,
        });
      }
    }
    setSaveLoading(false);
  }

  function handleUploadClick(e) {
    e.preventDefault();
    document.getElementById(`${e.target.dataset.idx}-hiddenFileInput`).click();
  }

  function renderSceneList(scenes) {
    return scenes.map((scene, idx) =>
      scene !== [] ? (
        <Card
          onDragStart={(e) => {
            handleDragStart(e, { scene, idx });
          }}
          onDragEnter={
            dragging
              ? (e) => {
                  handleDragEnter(e, { scene, idx });
                }
              : null
          }
          draggable
          key={idx}
          index={idx}
          type="card"
        >
          <InnerCardLayout>
            <TopSection>
              <ExampleImage img={scene.imagePath}>
                <input
                  name={`file-${idx}`}
                  type="file"
                  onChange={handleSceneChange}
                  data-idx={idx}
                  className="image"
                  style={{ display: 'none' }}
                  id={`${idx}-hiddenFileInput`}
                />
                <ImageOverlay data-idx={idx} onClick={handleUploadClick}>
                  <UploadIcon />{' '}
                  {scene.imagePath ? 'Replace Image' : 'New Image'}
                </ImageOverlay>
                <DeleteButton
                  onClick={(e) => {
                    handleDelete(e, { scene });
                  }}
                >
                  {!isDeleting ? (
                    <>
                      <DeleteIcon />
                    </>
                  ) : (
                    <>
                      <CircleSpinner size={10} />
                    </>
                  )}{' '}
                </DeleteButton>
              </ExampleImage>
            </TopSection>
            <CoreSection>
              <FormGroup>
                <InputTitle>Script</InputTitle>
                <TextareaAutosize
                  placeholder="Start scene here..."
                  async
                  name={`script-${idx}`}
                  className="script input-control"
                  data-idx={idx}
                  value={scenes[idx].script}
                  onChange={handleSceneChange}
                />
              </FormGroup>
              <FormGroup>
                <InputTitle>Actions</InputTitle>
                <TextareaAutosize
                  placeholder="Start action here..."
                  async
                  name={`actions-${idx}`}
                  data-idx={idx}
                  value={scenes[idx].actions}
                  className="actions input-control"
                  onChange={handleSceneChange}
                />
              </FormGroup>
            </CoreSection>
          </InnerCardLayout>
        </Card>
      ) : (
        <AddScene onClick={addScene}>
          <AddIcon />
        </AddScene>
      )
    );
  }

  return (
    <Layout>
      <Header>
        <Title>{props.location.state.title}</Title>
        <Button onClick={handleSaveBoards}>
          {!saveLoading ? (
            <>
              <SaveIcon /> Save Board{' '}
            </>
          ) : (
            <>
              <CircleSpinner size={10} />{' '}
              <span style={{ marginLeft: '5px' }}>Saving...</span>
            </>
          )}
        </Button>
      </Header>
      <InnerLayout>
        {isLoading ? <div>Loading...</div> : <>{renderSceneList(scenes)}</>}
        <AddScene onClick={addScene}>
          <AddIcon />
        </AddScene>
      </InnerLayout>
    </Layout>
  );
}
