/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars/

{   
    'use strict';
  
    const select = {
      templateOf: {
        books: '#template-book',
      },
  
      listOf: {
        booklist: '.books-list',
        filters: '.filters',
      },
  
      containerOf: {
        image: '.book__image',
      },
  
      imageParams: {
        id: '.book-id',
      },  
    };
      
    const templates = {
      bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
    };
  
  
    /* write a function to render a booklist in HTML .books-list */
    function render(){
  
      /* make a loop for each book from dataSource.books */
      for(const eachBook of dataSource.books){
          
        /* generate HTML for each book based on template */
        const generatedHTML = templates.bookTemplate(eachBook);
        
        /* create element using utils.createElementFromHTML */
        const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
        
        /* find booklist container */
        const bookListContainer = document.querySelector(select.listOf.booklist);
        
        /* add DOM element to the booklist */
        bookListContainer.appendChild(bookDOMElement);
      }
    }
  
    render();
    
   
  
    /* write a function initActions to add a book to a favorite list and filter them*/
    function initActions(){
  
      /* START - list of favorite books */
      /* make an empty array with favorite books */
      let favoriteBooks = [];
  
      /* make a const with reference to entire image list */
      // const imageContainer = document.querySelectorAll(select.containerOf.image);
  
      /* make a const with reference to entire list of images */
      const imageListContainer = document.querySelector(select.listOf.booklist);
  
      /* make loop for every image */
      // for(const image of imageContainer){
  
      /* add event listener to every image */
      // image.addEventListener('dblclick', function(event){
  
      /* add event listener to the entire list of images */
      imageListContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
  
        // if(!favoriteBooks.includes(bookID)){
          
        /* check if offset Parent of the image contains class .book_image) */
        if(event.target.offsetParent.classList.contains('book__image')){
  
          /* find clickedElement */
          const clickedElement = event.target.offsetParent;
  
          /* find const with data-id of the image */
          const bookID = clickedElement.getAttribute('data-id');
  
          if(!favoriteBooks.includes(bookID)){
  
            /* add favorite to clickedelement */
            clickedElement.classList.add('favorite');
  
            /* push this book to the favorite books array */
            favoriteBooks.push(bookID);
  
          /* if it's alreayd in the array */
          } else if(favoriteBooks.includes(bookID)){
  
            /* remove class favorite */
            clickedElement.classList.remove('favorite');
  
            /* remove bookID from the array */
            const indexOfBookID = favoriteBooks.indexOf(bookID);
            favoriteBooks.splice(indexOfBookID, 1);
  
          }
        }
          
        console.log(favoriteBooks);
      });
      // }
      /* END - list of favorite books */
  
      /* START - filtering */
  
      /* make an empty array of filters */
      const filtersArray = [];
  
      /* find reference to filters */
      const filtersContainer = document.querySelector(select.listOf.filters);
  
      /* add event listener to filtersContainer */
      filtersContainer.addEventListener('click', function(event){
        // event.preventDefault();
  
        /* find const of clickedElement */
        const clickedElement = event.target;
  
        /* check if it's a checkbox that was clicked in the whole filters container - event.target */
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
  
          // console.log(event.target.value);
          
          /* if checked - push it's value to array */
          if(clickedElement.checked){
            filtersArray.push(clickedElement.value);
                
            /* if uncheckes - remove from array */
          } else /* if(!clickedElement.checked) */{
    
            /* remove bookID from the array */
            const indexOfFilterID = filtersArray.indexOf(clickedElement.value);
            filtersArray.splice(indexOfFilterID, 1);
          }
        }
      });
      /* END - filtering */
    }
    initActions();
  
  
  
  
  
  }