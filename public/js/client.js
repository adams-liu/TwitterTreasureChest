// const fills = $(".filledBox");
// console.log(fills);
const fills = $(".filledBox");
var empties = $(".emptyBox");
const tweets = $(".tweetBox");

var draggedItem;

fills.each(function(){
    this.addEventListener('dragstart', dragStart);
    this.addEventListener('dragend', dragEnd);
});

tweets.each(function(){
    this.addEventListener('dragstart', dragStart);
    this.addEventListener('dragend', dragEnd);
});

// Loop through empties and call drag events
empties.each(function(){
    this.addEventListener('dragover', dragOver);
    this.addEventListener('dragenter', dragEnter);
    this.addEventListener('dragleave', dragLeave);
    this.addEventListener('drop', dragDrop);

});

// Picture
function dragStart(){
    draggedItem = this;
    console.log(this);
    this.classList.add('hold');
    setTimeout(()=>{
        this.classList.add('invisible');
    },0);
}

function dragEnd(){
    this.classList.remove('hold');
    this.classList.remove('invisible');
    this.classList.add("filledBox");
}

// Boxes

function dragOver(e){
    e.preventDefault();
    console.log('over');
}

function dragEnter(e){
    e.preventDefault();
    this.classList.add('hovered');
    console.log('enter'); 
}
function dragLeave(){
    this.classList.remove('hovered');
    console.log('leave');
}
function dragDrop(){
    this.classList.remove('hovered');
    console.log('drop'); 
   this.append(draggedItem);
    // this.append(fills);
}

// Adding New Boxes
function addBox(){
  const addButton = $("#btnBreak"); 
  addButton.before("<br><div class='emptyBox'></div>");
  empties = $(".emptyBox");
  const addedBox = empties[empties.length-1];
  addDragFeatures(addedBox);
  console.log("Goodbye World!")
}

// Adding drag features for the boxes
function addDragFeatures(addedBox){
    addedBox.addEventListener('dragover', dragOver);
    addedBox.addEventListener('dragenter', dragEnter);
    addedBox.addEventListener('dragleave', dragLeave);
    addedBox.addEventListener('drop', dragDrop);
}