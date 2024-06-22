const cl=console.log;
    

const backDrop=document.getElementById("backDrop")
const movieContainer=document.getElementById("movieContainer")
const movieForm=document.getElementById("movieForm")
const addmovieBtn=document.getElementById("addmovieBtn")
const movieModel=document.getElementById("movieModel")
const movieCloseBtn=[...document.querySelectorAll(".movieClose")]
const titleControl=document.getElementById("title")
const imageUrlControl=document.getElementById("imageUrl")
const contentControl=document.getElementById("content")
const ratingControl=document.getElementById("rating")
const moviesubmitBtn=document.getElementById("moviesubmitBtn")
const movieupdateBtn=document.getElementById("movieupdateBtn")   
const updateH3=document.getElementById("updateH3")   
const AddH3=document.getElementById("AddH3")   




const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
 };





 const createMovieCard=(arr)=>{ 
    let result='';

    arr.forEach(mov=>{
        result +=` <div class="col-4 mb-4">
        <div class="card movieCard"  id="${mov.movieId}">
                     <figure class="m-0">
                   <img src="${mov.imageUrl}">
                   <figcaption>
                       <h3>${mov.title}</h3>
                       <strong>rating:${mov.rating}</strong>
                       <p class="content">${mov.content}</p>
                       <div>
                    <button class="btn btn-sm  btn-light" onclick="onMovieEdit(this)">
                       edit
                   </butotn>
                   <button class="btn btn-sm nfx-btn text-white" onclick="onMovieRemove(this)">
                       remove
                   </butotn>
                       </div>
                   </figcaption>
               </figure>
   
           
       </div>
   
   </div>`
   
   movieContainer.innerHTML=result;
   }    )
 }
   

 

  

let moviesArr = JSON.parse(localStorage.getItem("moviesArr"))|| []
if(moviesArr.length>0){
    createMovieCard(moviesArr)
}
 


const toggleModelBackDrop=()=>{
    backDrop.classList.toggle('visible')
    movieModel.classList.toggle('visible')
    movieupdateBtn.classList.add('d-none')
     moviesubmitBtn.classList.remove("d-none")
     movieForm.reset()



     updateH3.classList.add("d-none")
     AddH3.classList.remove("d-none")

}


const onMovieEdit=(ele)=>{
    
    toggleModelBackDrop();
      let  EditId = ele.closest('.movieCard').id;
      localStorage.setItem("editMovieId",EditId)
      cl(EditId)
      updateH3.classList.remove("d-none")
      AddH3.classList.add("d-none")

      let EditObj = moviesArr.find(movie=>movie.movieId === EditId);
      cl(EditObj)

   


      titleControl.value = EditObj.title;
      contentControl.value = EditObj.content;
      ratingControl.value = EditObj.rating;
      imageUrlControl.value = EditObj.imageUrl;


      movieupdateBtn.classList.remove('d-none')
      moviesubmitBtn.classList.add("d-none")
    //   updateH3.classList.remove("d-none")
    //   AddH3.classList.add("d-none")



}


 const onMovieupdate=()=>{
     let updateMovieId=localStorage.getItem("editMovieId")
    let updatedObj={
        title:titleControl.value,
        content:contentControl.value,
        imageUrl:imageUrlControl.value,
        rating:ratingControl.value,
        movieId:updateMovieId
     } 
     cl(updatedObj)
     let getIndex=moviesArr.findIndex(movie=>movie.movieId===updateMovieId );
     moviesArr[getIndex]=updatedObj
     localStorage.setItem("moviesArr",JSON.stringify(moviesArr));  
     let getMovieCard=document.getElementById(updateMovieId)
     cl(getMovieCard)  
     getMovieCard.innerHTML=`
                     <figure class="m-0">
                   <img src="${updatedObj.imageUrl}">
                   <figcaption>
                       <h3>${updatedObj.title}</h3>
                       <strong>rating:${updatedObj.rating}</strong>
                       <p class="content">${updatedObj.content}</p>
                       <div>
                    <button class="btn btn-sm  btn-light" onclick="onMovieEdit(this)">
                       edit
                   </butotn>
                   <button class="btn btn-sm nfx-btn text-white" onclick="onMovieRemove(this)">
                       remove
                   </butotn>
                       </div>
                   </figcaption>
               </figure>
     `
     toggleModelBackDrop() 
    }
 
const onMovieRemove=(ele)=>{
    Swal.fire({
        title: "Do you want to remove this movie?",
        showCancelButton: true,
        confirmButtonText: "remove",
        confirmButtonColor:"#e50914",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let removeId=ele.closest(".movieCard").id;
            cl(removeId)
            //remove obj from array
            let getIndex=moviesArr.findIndex(movie=>movie.movieId===removeId)
           moviesArr.splice(getIndex,1)
            //remove obj from Ls
            localStorage.setItem('moviesArr',JSON.stringify(moviesArr))

            //remove card from UI
            ele.closest(".movieCard").parentElement.remove();
            swal.fire({
                title :'movie removed successfully!!!',
                timer:3500,
                icon:"success"
                
            })
        } 
        });
     
}



const onMovieAdd=(mov)=>{
 mov.preventDefault();
 let movObj={
    title:titleControl.value,
    content:contentControl.value,
    imageUrl:imageUrlControl.value,
    rating:ratingControl.value,
    movieId:generateUuid()
}
  cl(movObj);
  movieForm.reset()
  moviesArr.unshift(movObj);
  localStorage.setItem("moviesArr",JSON.stringify(moviesArr));
   toggleModelBackDrop();
   swal.fire(
    {
        title:"new movie Added succesfully",
        timer:3500,
        icon:"succuss",
    }
   )

//   createMovieCard(moviesArr)

 let div=document.createElement("div")
    div.className="col-md-4";
    
   
    div.innerHTML=`
           <div class="card movieCard" id="${movObj.movieId}">
   
            <figure class="m-0">
               <img src="${movObj.imageurl}">
               <figcaption>
             <h3>${movObj.title}</h3>
               <strong>rating:${movObj.rating}</strong>
                 <p class="content">${movObj.content}</p>
                 <div>
                 <button class="btn btn-sm  btn-light" onclick="onMovieEdit(this)">
                    edit
                </butotn>
                <button class="btn btn-sm nfx-btn text-white" onclick="onMovieRemove(this)">
                    remove
                </butotn>
                    </div>
         </figcaption>
      </figure>


    </div>
    `
    movieContainer.prepend(div)

}







movieCloseBtn.forEach(Btn=>{
    Btn.addEventListener('click',toggleModelBackDrop)
})
addmovieBtn.addEventListener('click',toggleModelBackDrop)

movieForm.addEventListener("submit",onMovieAdd)

movieupdateBtn.addEventListener("click", onMovieupdate)