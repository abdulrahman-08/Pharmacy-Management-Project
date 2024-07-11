var nameInput=document.getElementById("productName");
categoryInput=document.getElementById("productCategory")
var PriceInput=document.getElementById("productPrice");
var TaxInput=document.getElementById("ProductTax");
var DiscountInput=document.getElementById("productDiscount");
var MFGInput=document.getElementById("productMFG");
var EXPInput=document.getElementById("ProductEXP");
var CountInput=document.getElementById("productCount");
var DescInput=document.getElementById("productDescription");
var sellingPrice=document.getElementById("sellingPrice");
var searchInput=document.getElementById("searchInput");
var deleteAllProduct=document.getElementById("deleteAll")
var date=document.getElementById("date")
var time=document.getElementById("time")
var expCheekDate=document.getElementById("expCheek")
var notDataInTable=document.getElementById("notData")
var addButtone=document.getElementById("addButton")
var countDiv=document.getElementById("countDiv")
var productList;
var getDate;
var mod='create'
var temp=0
function updateTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var formattedDate = year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    getDate=formattedDate
    console.log(formattedDate);
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var formattedTime = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
    
    date.innerHTML=formattedDate
    time.innerHTML=formattedTime
}
updateTime()
setInterval(updateTime, 60000);
if (localStorage.getItem("dataShow")==null) {
    productList=[];
    showData()
}
else{
    productList=JSON.parse(localStorage.getItem("dataShow"))
    showData();
}
function sumSellingPrice(){
    if(PriceInput.value!=''){
        var result=(+PriceInput.value+ +TaxInput.value)- +DiscountInput.value
        sellingPrice.innerHTML=result
        sellingPrice.style.background='#040'
    }else{
        sellingPrice.innerHTML='';
        sellingPrice.style.background='#b42626'
    }
}
function expCheek(){
    if(getDate>EXPInput.value&&EXPInput.value!=''){
        expCheekDate.style.background='#b42626'
        expCheekDate.style.padding='2px 3px'
        expCheekDate.style.color='white'
        expCheekDate.style.fontWeight='600'
        expCheekDate.innerHTML=' Warning: This product has expired!!'
    }else if(getDate<EXPInput.value&&EXPInput.value!='') {
        expCheekDate.style.background='#040'
        expCheekDate.style.padding='2px 3px'
        expCheekDate.style.color='white'
        expCheekDate.style.fontWeight='600'
        expCheekDate.innerHTML='Effective product !! '
    }else{
         expCheekDate.style.background='#f0f4f6'
        expCheekDate.innerHTML=''
    }
}
function addProduct(){
    var product={
        name:nameInput.value,
        category:categoryInput.value,
        price:PriceInput.value,
        tax:TaxInput.value,
        discount:DiscountInput.value,
        sellingPrice:(+PriceInput.value+ +TaxInput.value)- +DiscountInput.value,
        Mfg:MFGInput.value,
        exp:EXPInput.value,
        count:CountInput.value,
        desc:DescInput.value,
    }
   if(product.price!=''&&product.name!=''&&product.category!=''){
    if(mod=='create'){
        if(CountInput.value>=1&&CountInput.value<=100){
            for(i=0;i<CountInput.value;i++){
                productList.push(product);
                window.alert('Product Added Successfuly')
                if(getDate>EXPInput.value&&EXPInput.value!=''){
                    trData.style.background='#b42626'
                }
            }
        }else if(CountInput.value>100){
                window.alert('It is not possible to add more than 100 products at one time')
    
        }else if (CountInput.value==0||CountInput<0){
            window.alert('The number of products cannot be equal to zero or less than zero')
        }
    }else{
        productList[temp]=product
        addButtone.innerHTML='Add Product'
        countDiv.style.display='inline'
        mod='create'
        window.alert('Product Update Successfuly')
    }
   }else{
    window.alert('Name, category and price are required')
   }
    showData();
    localStorage.setItem("dataShow",JSON.stringify(productList))
    clearForm()
}
function updateData(i){
    nameInput.value=productList[i].name
    categoryInput.value=productList[i].category
    PriceInput.value=productList[i].price
    TaxInput.value=productList[i].tax
    DiscountInput.value=productList[i].discount
    MFGInput.value=productList[i].Mfg
    EXPInput.value=productList[i].exp
    CountInput.value=productList[i].count
    DescInput.value=productList[i].desc
    sumSellingPrice()
    expCheek()
    temp=i
    mod='update'
    addButtone.innerHTML='Update Product'
    scroll({
        top:80,
        behavior:"smooth"
    })
    countDiv.style.display='none'
}
function showData(){
    var temp='';
    for (let i = 0; i < productList.length; i++) {   
        if(getDate>productList[i].exp){
            temp+=`  <tr class="table-danger">
            <td>`+(i+1)+`</td>
            <td>`+productList[i].name+`</td>
            <td>`+productList[i].category+`</td>
            <td>`+productList[i].price+`</td>
            <td>`+productList[i].tax+`</td>
            <td>`+productList[i].discount+`</td>
            <td>`+productList[i].sellingPrice+`</td>
            <td>`+productList[i].Mfg+`</td>
            <td>`+productList[i].exp+`</td>
            <td>`+productList[i].desc+`</td> 
            <td>
         <button onclick="updateData(`+i+`)" class="btn btn-info">update</button>
            </td>
            <td>
                <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
            </td>
        </tr>`   
        }else{
            temp+=`  <tr>
            <td>`+(i+1)+`</td>
            <td>`+productList[i].name+`</td>
            <td>`+productList[i].category+`</td>
            <td>`+productList[i].price+`</td>
            <td>`+productList[i].tax+`</td>
            <td>`+productList[i].discount+`</td>
            <td>`+productList[i].sellingPrice+`</td>
            <td>`+productList[i].Mfg+`</td>
            <td>`+productList[i].exp+`</td>
            <td>`+productList[i].desc+`</td> 
            <td>
         <button onclick="updateData(`+i+`)" class="btn btn-info">update</button>
            </td>
            <td>
                <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
            </td>
        </tr>`   
        }
       
    }
    document.getElementById("myData").innerHTML=temp;
    if(productList.length>0){
        deleteAllProduct.innerHTML=`<button onclick="deleteAll()"  class="btn btn-outline-danger  w-50 border-2 mb-3"> Delete ALL (`+productList.length+`)</button>`
        notDataInTable.innerHTML=``
    }else{
        deleteAllProduct.innerHTML=``
        notDataInTable.innerHTML=`  <h4 class="m-2 p-2 ">There Is No Data to Display !</h4>`

    }
}
function deleteAll(){
    localStorage.clear()
    productList.splice(0)
    showData()
}
function deleteProduct(x){
productList.splice(x,1)
showData();
localStorage.setItem("dataShow",JSON.stringify(productList))
}
function clearForm(){
   nameInput.value='';
   categoryInput.value=''
   PriceInput.value='';
   TaxInput.value='';
   DiscountInput.value='',
   MFGInput.value='',
   EXPInput.value='',
   CountInput.value=''
   DescInput.value='';
   sellingPrice.innerHTML=''
   sumSellingPrice()
   expCheek()
}
function search(searchValue){    
    var temp='';
    for(let i=0;i<productList.length;i++)
    {
        if(productList[i].name.toUpperCase().includes(searchValue.toUpperCase())==true||productList[i].category.toUpperCase().includes(searchValue.toUpperCase())==true)
        {
            if(getDate>productList[i].exp){
                temp+=`  <tr class="table-danger">
                <td>`+(i+1)+`</td>
                <td>${productList[i].name.replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
                <td>${productList[i].category.replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
                <td>`+productList[i].price+`</td>
                <td>`+productList[i].tax+`</td>
                <td>`+productList[i].discount+`</td>
                <td>`+productList[i].sellingPrice+`</td>
                <td>`+productList[i].Mfg+`</td>
                <td>`+productList[i].exp+`</td>
                <td>`+productList[i].desc+`</td> 
                <td>
                <button onclick="updateData(`+i+`)" class="btn btn-info">update</button>
                </td>
                <td>
                    <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
                </td>
            </tr>`   
            }else{
                temp+=`  <tr>
                <td>`+(i+1)+`</td>
                <td>${productList[i].name.replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
                <td>${productList[i].category.replace(searchValue, `<span class='bg-info'>${searchValue}</span>`)}</td>
                <td>`+productList[i].price+`</td>
                <td>`+productList[i].tax+`</td>
                <td>`+productList[i].discount+`</td>
                <td>`+productList[i].sellingPrice+`</td>
                <td>`+productList[i].Mfg+`</td>
                <td>`+productList[i].exp+`</td>
                <td>`+productList[i].desc+`</td> 
                <td>
                <button onclick="updateData(`+i+`)" class="btn btn-info">update</button>
                </td>
                <td>
                    <button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button>
                </td>
            </tr>`   
            }
        }
    }
    document.getElementById("myData").innerHTML=temp;
} 