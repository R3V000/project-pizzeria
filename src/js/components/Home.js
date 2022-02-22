/* global Flickity */
import { templates,select,classNames} from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(element){

    this.render(element);
    this.initWidgets();
    this.initLinks();
  }

  render(element){
    this.dom = {};
    this.dom.wrapper = element;

    const generatedHTML = templates.homePage(element);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    this.dom.wrapper.appendChild(generatedDOM);
  }

  initWidgets(){

    var elem = document.querySelector('.main-carousel');
    new Flickity( elem, {
      autoPlay: 3000,
      prevNextButtons: false,
      imagesLoaded: true,
    });
  }

  activatePage(pageId){

    this.pages = document.querySelector(select.containerOf.pages).children;
    this.navLinks = document.querySelectorAll(select.nav.links);


    for(let page of this.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId );
    }
    for(let link of this.navLinks){
      if(link.getAttribute('href').replace('#','') == pageId){
        link.classList.toggle(classNames.pages.active);
      }else {
        link.classList.remove(classNames.pages.active);
      }
    }

    window.location.hash = '#/' + pageId;
    
  }

  initLinks(){
    this.links = document.querySelectorAll('.link');

    for(let link of this.links){
      link.addEventListener('click', (event) =>{
        event.preventDefault();
        const clickedLink = link;
        const id = clickedLink.getAttribute('href').replace('#', '');
        this.activatePage(id);
      });
    }
  }

}


export default Home;