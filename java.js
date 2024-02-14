let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
//get total
function getTotal()
{
	if (price.value != '')
	{
		let result = (+price.value + +taxes.value + +ads.value ) - +discount.value
		total.innerHTML = result;
		total.style.background = 'green';
	}
	else{
		total.style.background = 'red';
	}
}
//create product
let datapro;
if (localStorage.Product != null)
{
	datapro = JSON.parse(localStorage.Product)
}else{
	datapro = [];
}
submit.onclick = function()
{ 
	let newpro = {
		title:title.value.toLowerCase(),
		price:price.value,
		taxes:taxes.value,
		ads:ads.value,
		discount:discount.value,
		total:total.innerHTML,
		count:count.value,
		category:category.value.toLowerCase(), 
	}
	if (title.value != '')
	{
		if (mood == 'create'){
	
			if (newpro.count > 1)
			{
				for (let i = 0; i < newpro.count; i++)
				{
					datapro.push(newpro);
				}
			}else{
				datapro.push(newpro);
			}
		}else{
			datapro[tmp] = newpro;
			mood = 'create'
			submit.innerHTML = 'create';
			count.style.display = 'block';
		}
		ClaireData();
	}

	localStorage.setItem('Product', JSON.stringify(datapro));
	ClaireData();
	// ShowData();
}
//clear inputs
function ClaireData(){
	title.value = ''
	price.value = ''
	taxes.value = '';
	ads.value = '';
	discount.value = '';
	total.innerHTML = '';
	count.value = '';
	category.value = '';
}
//read the product
function ShowData()
{
	getTotal(); 
	let table = '';
	for (let i = 0; i < datapro.length; i++)
	{
		table += `
		<tr>
		<td>${i}</td>
		<td>${datapro[i].title}</td>
		<td>${datapro[i].price}</td>
		<td>${datapro[i].taxes}</td>
		<td>${datapro[i].ads}</td>
		<td>${datapro[i].discount}</td>
		<td>${datapro[i].total}</td>
		<td>${datapro[i].category}</td>
		<th><button onclick="UpdateData(${i})" id="update">update</button></th>
		<th><button onclick="deletedata(${i})">delete</button></th>
		</tr>
		`;
	}
	document.getElementById('tbody').innerHTML = table;
	let btndelete = document.getElementById('deleteall');
	if (datapro.length > 0)
	{
		btndelete.innerHTML = `
		<button onclick="DeleteAll()">delete All(${datapro.length})</button>
		`
	}else{
		btndelete.innerHTML = '';
	}
} 
ShowData();
//delete
function deletedata(p){
	datapro.splice(p,1);
	localStorage.Product = JSON.stringify(datapro);
	ShowData();
}
function DeleteAll(){
	localStorage.clear()
	datapro.splice(0);
	ShowData();
}
//update

function UpdateData(p){
	 title.value = datapro[p].title;
	 price.value = datapro[p].price;
	 price.taxes = datapro[p].taxes;
	 price.ads = datapro[p].ads;
	 price.discount = datapro[p].discount;
	 count.style.display = 'none';
	 getTotal();
	 price.category = datapro[p].category;
	 submit.innerHTML = 'Update';
	 mood = 'update';
	 tmp = p;
	 scroll({
		top:0,
		behavior:"smooth"
	})
}
//search
let searchmood = 'title';
function getSearchmood(id){
	let search = document.getElementById('search');
	if(id == 'searchtitle')
	{
		searchmood = 'title';
	}else{
		searchmood = 'category';
	}
	search.placeholder = 'Search by'+searchmood;
	search.focus();
	search.value = '';
	ShowData();
}
function SearchData(v)
{
	let table = '';
	for(let i = 0; i < datapro.length; i++)
	{
		if (searchmood == 'title')
		{
				if (datapro[i].title.includes(v.toLowerCase()))
				{
					table += `
					<tr>
					<td>${i}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].price}</td>
					<td>${datapro[i].taxes}</td>
					<td>${datapro[i].ads}</td>
					<td>${datapro[i].discount}</td>
					<td>${datapro[i].total}</td>
					<td>${datapro[i].category}</td>
					<th><button onclick="UpdateData(${i})" id="update">update</button></th>
					<th><button onclick="deletedata(${i})">delete</button></th>
					</tr>
					`;
				}
		}
		else {
				if (datapro[i].category.includes(v.toLowerCase()))
				{
					table += `
					<tr>
					<td>${i}</td>
					<td>${datapro[i].title}</td>
					<td>${datapro[i].price}</td>
					<td>${datapro[i].taxes}</td>
					<td>${datapro[i].ads}</td>
					<td>${datapro[i].discount}</td>
					<td>${datapro[i].total}</td>
					<td>${datapro[i].category}</td>
					<th><button onclick="UpdateData(${i})" id="update">update</button></th>
					<th><button onclick="deletedata(${i})">delete</button></th>
					</tr>
					`;
				}
		}
	}
	document.getElementById('tbody').innerHTML = table;

}
//clean data
 
