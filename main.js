searchBook = () => {
    const inputSection = document.getElementById("inputSection");
    const bookCarding = document.getElementById("bookCarding");
    const totalBookFound = document.getElementById("bookFound");
    const emptyInput = document.getElementById("emptyInput");
    const error = document.getElementById("error");

    const inputValue = inputSection.value;
    bookCarding.textContent = "";
    totalBookFound.innerText = "";
    if (inputValue === "") {
        spinner("hidden");
        emptyInput.style.display = "block";
        error.style.display = "none";
        totalBookFound.innerText = "";
        bookCarding.textContent = "";
    } else {
        spinner("visible");
        emptyInput.style.display = "none";
        // *********** url of book*************//
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                displayBook(data);
            });
    }
    inputSection.value = "";
};

displayBook = (data) => {
    const totalBookFound = document.getElementById("bookFound");
    totalBookFound.innerText = ` ${data.numFound} results found.... `;




    const error = document.getElementById("error");
    if (data.numFound === 0) {
        totalBookFound.innerText = "";
        error.style.display = "block";
        spinner("hidden");
    } else {
        error.style.display = "none";
        const bookCarding = document.getElementById("bookCarding");

        data?.docs.forEach((item) => {
            const div = document.createElement("div");
            console.log(item);
            //*************** image show********************//
            item?.cover_i
                ? (imgUrl = `https://covers.openlibrary.org/b/id/${item?.cover_i}-M.jpg`)
                : (imgUrl = "image/not_found.png");

            //************author_part******************//
            item?.author_name ? (auth = item?.author_name.join()) : (auth = "not available");
            //***********publisher_part****************//
            item?.publisher[0] ? (publisher = item?.publisher[0]) : (publisher = "not available");
            //*************publish_date****************//
            item?.publish_date[0] ? (publishDate = item?.publish_date[0]) : (publishDate = "not available");

            console.log(item?.title);

            div.innerHTML = `
         <div class="col">
             <div class="card">
                  <img height='450px'  src=${imgUrl}  class="card-img-top" alt="...">
                 <div class="card-body">
                     <h5 id="author" class="card-title">${item?.title}</h5>
                     <h6 class="card-text">Author Name:  <span class ="text-secondary"> ${auth} </span></h6>
                     <h6 class="card-text">Publisher: <span class ="text-secondary"> ${publisher} </span> </h6>
                     <h6 class="card-text">Published: <span class ="text-secondary">  ${publishDate} </span> </h6>
  
                 </div>
             </div>
         </div>
         `;
            bookCarding.appendChild(div);
            spinner("hidden");
        });
    }
};

// ******************Spinner Part*******************//////
spinner = (property) => {
    const spinner = document.getElementById("spinner");
    spinner.style.visibility = property;
};
