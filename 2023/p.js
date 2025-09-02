var tbodyElement = document.getElementsByTagName("tbody")[7];

if (tbodyElement) {
    var trElements = tbodyElement.getElementsByTagName("tr");
    var numberOfTrElements = Array.from(trElements).filter(tr => !tr.classList.contains("hidden")).length;

    console.log(tbodyElement)
    console.log("Number of <tr> elements in tbody:", numberOfTrElements);
} else {
    console.log("Tbody not found");
}