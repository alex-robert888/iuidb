import { IonContent, IonPage } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import socketClient from "socket.io-client";
import Header from '../../components/header/Header';
import Popup from '../../components/popup/Popup';
import './DesignsPage.css'
import DesignsService from '../../services/designs-service';
import IDesign from '../../../../common/models/design';
import Design from '../../models/design';
import ReactPaginate from 'react-paginate';



const DesignsPage: React.FC = () => {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [designs, setDesigns] = useState<Array<any | null>>([]);
  const [newDesign, setNewDesign] = useState<IDesign>({ title: "", description: "", url: "" });
  const [editDesign, setEditDesign] = useState<IDesign>({ title: "", description: "", url: "" });
  const designsService = new DesignsService();
  const [currentItems, setCurrentItems] = useState<Array<any>>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  const fetchDesigns = async () => {
    try {
      const designs = await designsService.index();
      setDesigns(designs);
    } catch (e) {
      console.error(e);
    }
  }

  async function createDesign() {
    try {
      const design = new Design(newDesign);
      await designsService.create(design);
    } catch (e) {
      console.error(e);
    }

    fetchDesigns();
  }

  async function updateDesign() {
    try {
      const design = new Design(editDesign);
      await designsService.update(design);
    } catch (e) {
      alert(e)
    }

    fetchDesigns();
  }

  async function onDeleteButtonClick(deleteDesign: Design) {
    try {
      await designsService.delete(deleteDesign);
    } catch (e) {
      alert(e)
    }

    fetchDesigns();
  }

  function onEditButtonClick(designId: string) {
    setEditDesign(designs.find((design: Design) => design.attributes._id === designId).attributes);
    setIsEditPopupOpen(true);
  }

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % designs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    fetchDesigns();

    const socket = socketClient("http://localhost:5000");
    socket.on("dbChange", data => {
      alert(data)
    });
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(designs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(designs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage])

  function renderDesigns() {
    return currentItems.map((design: Design) => (
      <li key={design.attributes._id}>
        <article className="design-card">
          <h3 className="text-bold ">{design.attributes.title}</h3>
          <p>{design.attributes.description}</p>
          <a href={design.attributes.url}>{design.attributes.url}</a>
          <br/><br/>
          <button className="button button-white button-medium" onClick={ () => onEditButtonClick(design.attributes._id || "") }>Edit</button>
          <button className="button button-red button-medium" onClick={ () => onDeleteButtonClick(design) }>Delete</button>
        </article>
      </li>
    ));
  }

  return (
    <IonPage>
      <Header />
      <IonContent id="designs-page__ion-content">
        <h2 className="text-large">Designs</h2> <br/>
        <button className="button button-purple button-large" onClick={ () => setIsCreatePopupOpen(true) }>+Create</button> <br/><br/>
        <ul id="designs-page__ul-designs" className="ul">
          { renderDesigns() }
        </ul>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
        />
      </IonContent>

      {/* Create Popup */}
      <Popup 
        title='Create a New Design'
        description='Configure the design below.'
        isOpen={ isCreatePopupOpen }
        onCancel={ () => setIsCreatePopupOpen(false) }
        onFinish={ () => createDesign() }
      >
        <form>
          <ul className="ul">
            <li>
              <label htmlFor="design-title">Title</label>
              <input 
                type="text" 
                name="design-title"
                className="input flex-col" 
                value={ newDesign.title }
                onChange={ (e) => setNewDesign({...newDesign, title: e.target.value}) }  
              />
            </li>

            <li>
              <label htmlFor="design-description">Description</label>
              <input 
                type="text" 
                name="design-description"
                className="input flex-col" 
                value={ newDesign.description }
                onChange={ (e) => setNewDesign({...newDesign, description: e.target.value}) }    
              />
            </li>

            <li>
              <label htmlFor="design-url">URL</label>
              <input 
                type="text" 
                name="design-url"
                className="input flex-col" 
                value={ newDesign.url }
                onChange={ (e) => setNewDesign({...newDesign, url: e.target.value}) }  
              />
            </li>
          </ul>
        </form>
      </Popup>

      {/* Edit Popup */}
      <Popup 
        title='Edit Design.'
        description='Edit the design below.'
        isOpen={ isEditPopupOpen }
        onCancel={ () => setIsEditPopupOpen(false) }
        onFinish={ () => updateDesign() }
      >
        <form>
          <ul className="ul">
            <li>
              <label htmlFor="design-title">Title</label>
              <input 
                type="text" 
                name="design-title"
                className="input flex-col" 
                value={ editDesign.title }
                onChange={ (e) => setEditDesign({...editDesign, title: e.target.value}) }  
              />
            </li>

            <li>
              <label htmlFor="design-description">Description</label>
              <input 
                type="text" 
                name="design-description"
                className="input flex-col" 
                value={ editDesign.description }
                onChange={ (e) => setEditDesign({...editDesign, description: e.target.value}) }   
              />
            </li>

            <li>
              <label htmlFor="design-url">URL</label>
              <input 
                type="text" 
                name="design-url"
                className="input flex-col" 
                value={ editDesign.url }
                onChange={ (e) => setEditDesign({...editDesign, url: e.target.value}) }   
              />
            </li>
          </ul>
        </form>
      </Popup>
    </IonPage>
  );
};

export default DesignsPage;
