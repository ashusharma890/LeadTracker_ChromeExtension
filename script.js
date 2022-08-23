let myLeads =[];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const delBtn = document.getElementById("del-btn");
const tabBtn = document.getElementById("tab-btn");

const leads= JSON.parse(localStorage.getItem("myLeads"));
// localStorage.clear();

if(leads)
{
    myLeads = leads;
    render(myLeads);
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(lead)
{
    let listItems = "";
    for(let i=0;i<lead.length;i++)
    {
    // const li = document.createElement("li");
    // li.textContent = myLeads[i];
    // ulEl.append(li);
    // listItems += "<li> <a target='_blank' href='" + myLeads[i] +"'>"+ myLeads[i]+ "</a></li>";
    listItems += 
    `
    <li> 
    <a target='_blank' href=' ${lead[i]}'> ${lead[i]}
    </a>
    </li>
    `
    }
    ulEl.innerHTML = listItems;
}

delBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads=[];
    render(myLeads);
    console.log("deleted");
});

inputBtn.addEventListener("click", function() 
{
    // console.log("clicked");
    // console.log(myLeads);
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
});




