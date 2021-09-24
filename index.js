let globaldata = []; //array

var taskContents = document.getElementById("taskContents");
const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,

        description: document.getElementById("taskDescription").value,



    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globaldata.push(newTaskDetails);
    savetolocalstorage();

}


const generateTaskCard = ({ id, url, title, type, description }) => {


    return (` <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-end">

                        <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)" > 
                        <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                        </button>
                       
                        <button type="button" class="btn btn-outline-danger name=${id} onclick="deleteTask(this)">
                        <i class="fas fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                        </button>


                    </div>
                </div>

                <img src=${url} height="200px" class="card-img-top" alt="image" />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <span class="badge bg-primary">${type}</span>
                </div>

                <div class="card-footer">
                    <button  class="btn btn-outline-primary float-end" name=${id}>OPEN TASK</button>
                </div>

            </div>
        </div>`)
}

const savetolocalstorage = () => {
    localStorage.setItem("mytasks", JSON.stringify({ tasks: globaldata }));
}


const reloadTaskCard = () => {
    const localStoragecopy = JSON.parse(localStorage.getItem("mytasks"));
    console.log("localStoragecopy");
    if (localStoragecopy) {

        globaldata = localStoragecopy["tasks"];
    }

    console.log(globaldata);


    globaldata.map((cardData) => {
            taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
        }

    )
}


const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globaldata = globaldata.filter((cardData) => cardData.id !== targetID);
    savetolocalstorage();
    window.location.reload();
}


const editTask = (e) => {
        const targetID = e.getAttribute("name");


        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
        e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable", "true")


        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditabletask(this)");
        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES";

    }
    //tasks is key
    //statetaskList is attribute

//style.setProperty

const saveEditabletask = (e) => {

    const targetID = e.getAttribute("name");
    console.log(targetID);

    let title = e.parentNode.parentNode.childNodes[5].childNodes[1];
    let text = e.parentNode.parentNode.childNodes[5].childNodes[3];
    let badge = e.parentNode.parentNode.childNodes[5].childNodes[5];
    globaldata.forEach((card) => {
        if (card.id === targetID) {
            card.title = title.textContent;
            card.type = badge.textContent;
            card.description = text.textContent;
        }
    });
    savetolocalstorage();
    window.location.reload();


}