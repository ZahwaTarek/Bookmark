var sName = document.getElementById("siteName");
var url = document.getElementById("siteURL");
var btn =document.getElementById("btnSubmit");
var bookmark = []
var bookmarkKey = "bookmark"

if (JSON.parse(localStorage.getItem(bookmarkKey))) {
    bookmark = JSON.parse(localStorage.getItem(bookmarkKey))
    displayBookmark(bookmark)
}

function addBookmark() {
       
    btn.removeAttribute("data-bs-toggle");
    btn.removeAttribute("data-bs-target");
    if(validation(sName)&&validation(url)){
      
    var bookmarkInfo = {
        siteName: sName.value,
        siteURL: url.value
    }
    bookmark.push(bookmarkInfo);
    localStorage.setItem(bookmarkKey, JSON.stringify(bookmark));
    updateInfo()
    displayBookmark(bookmark)
   
    console.log(bookmark);
    }else {
       btn.setAttribute("data-bs-toggle",'modal');
       btn.setAttribute("data-bs-target","#modalBtn");
    }

}


function updateInfo() {
    sName.value = ""
    url.value = ""
}

function displayBookmark(arr) {
    var bBox = ""
    for (var i = 0; i < bookmark.length; i++) {
        bBox += `<tr >
        <td class="p-3 ms-1">${bookmark[i].siteName}</td>
        <td class="p-3">${bookmark[i].siteURL}</td>
        <td class="p-3"><div class="btn-visit">
            <a href="https://${bookmark[i].siteURL}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </div></td>
        <td class="p-3"><div class="btn-delete">
            <button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button>
        </div></td>                    </tr>`
    }
    document.getElementById("data").innerHTML = bBox;

}


function deleteBookmark(deletedIndex) {
    bookmark.splice(deletedIndex, 1);
    localStorage.setItem(bookmarkKey, JSON.stringify(bookmark));

    displayBookmark(bookmark);

}

function validation(validationInput) {
    var regex = {
        siteName: /^[a-zA-Z]{4,20}$/,
        siteURL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
        

    }
    var isValid=regex[validationInput.id].test(validationInput.value);
    if(isValid) {
        validationInput.classList.replace("is-invalid","is-valid")  
       
    }else{
        if(validationInput.classList.contains("is-valid")){
            validationInput.classList.replace("is-valid","is-invalid");
        }else{
            validationInput.classList.add("is-invalid");
        }
    }
    return isValid;
}

