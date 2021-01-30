var topic = document.getElementById('input-topic'),
	topiclnk = document.getElementById('input-topiclnk'),
	time = document.getElementById('input-time'),
	days = document.getElementById('input-days'),
	teacher = document.getElementById('input-teacher'),
	teacherMail = document.getElementById('input-teacher-mail'),
	zoom = document.getElementById('input-zoom');
	
var form = document.getElementById('overlay_input')

let name = document.getElementById('input-name');
var	lastname = document.getElementById('input-lastname'),
	group = document.getElementById('input-group'),
	school = document.getElementById('input-school'),
	number = document.getElementById('input-number');

var profile = document.getElementById('overlay_profile');

var eraseForm = document.getElementById('overlay-erase');

var darkButton = document.getElementsByClassName('darkmode');
	var headChange = document.getElementById('title');
	var backgroundChange = document.getElementById('background');
	var cardChange = document.getElementsByClassName('area_class');
	var buttonChange = document.getElementsByClassName('area_class-button');
	var buttonCommChange = document.getElementsByClassName('area_class-button-com');
	var subtitlesChange = document.getElementsByClassName('title');
	var gridChange = document.getElementsByClassName('area_class-card-grid');

var editCard = document.getElementById('overlay-edit');
var edSet = document.getElementById('overlay-editSetting');

var topiced = document.getElementById('input-edtopic'),
	topiclnked = document.getElementById('input-edtopiclnk'),
	timeed = document.getElementById('input-edtime'),
	daysed = document.getElementById('input-eddays'),
	teachered = document.getElementById('input-edteacher'),
	teacherMailed = document.getElementById('input-edteacher-mail'),
	zoomed = document.getElementById('input-edzoom');

var elements = document.getElementsByClassName('editform');
var edElement = document.getElementsByClassName('edit');

//OPEN 
const dButton_m = document.getElementById('btn-darkmode-m');
const dButton_s = document.getElementById('btn-darkmode-s');
const openFormBtn = document.getElementById('btn-add');
const openProfileBtn = document.getElementById('btn-profile');
const openGPBtn = document.getElementById('btn-garbage');
const openEPBtn = document.getElementById('btn-edit');
const editPPBtn = document.getElementById('editPPBtn');

//CLOSE
const closeFormBtn = document.getElementById('btn-cerrar-form');
const closeProfBtn = document.getElementById('btn-close-prof');
const closeRemBtn = document.getElementById('btn-close-rem');
const closeEditBtn = document.getElementById('btn-close-edit');
const closeEditOpBtn = document.getElementById('btn-close-edit-op');

//ACCIONES
const addInfoBtn = document.getElementById('addButton');
const updateInfoBtn = document.getElementById('updateProf');
const remInfoBtn = document.getElementById('remBtn');
const editInfoBtn = document.getElementById('editBtn');

//BOTONES
//ABRIR
dButton_m.addEventListener('click', ()=>{
	darkmode();
})
dButton_s.addEventListener('click', ()=>{
	darkmode();
})
openFormBtn.addEventListener('click', ()=>{
	abrirForm();
})
openProfileBtn.addEventListener('click', ()=>{
	openProfile();
})
openGPBtn.addEventListener('click', ()=>{
	eraseClass();
})
openEPBtn.addEventListener('click', ()=>{
	editClass();
})
editPPBtn.addEventListener('click', ()=>{
	editOption();
})

//CERRAR
closeFormBtn.addEventListener('click', ()=>{
	cerrarForm();
})
closeProfBtn.addEventListener('click', ()=>{
	closeProfile();
})
closeRemBtn.addEventListener('click', ()=>{
	closeECard();
})
closeEditBtn.addEventListener('click', ()=>{
	closeEdit();
})
closeEditOpBtn.addEventListener('click', ()=>{
	closeEditOption();
})

//ACCIONES
addEventListener('load', ()=>{
	addCard();
})
addInfoBtn.addEventListener('click', ()=>{
	agregarInfo();
})
updateInfoBtn.addEventListener('click', ()=>{
	updateProfile();
})
remInfoBtn.addEventListener('click', ()=>{
	permRem();
})
editInfoBtn.addEventListener('click', ()=>{
	sendEditS();
})

//FUNCIONES 
function abrirForm(){
	var form = document.getElementById('overlay_input')

	form.classList.add('active')
}
function cerrarForm(){
	topic.value = null;
	topiclnk.value = null;
	time.value = null;
	days.value = null;
	teacher.value = null;
	teacherMail.value = null;
	zoom.value = null;

	form.classList.remove('active')
}

function abrirPopup(materia) {
	var overlaySelected = ('overlay'+materia)
	var popupSelected = (document.getElementById(overlaySelected));

	popupSelected.classList.add("active");
}
function cerrarPopup(materia) {
	console.log("Iniciando");
	var overlaySelected = ('overlay'+materia)
	var popupSelected = (document.getElementById(overlaySelected));

	console.log("medias");
	popupSelected.classList.remove("active");
	console.log("Fin");
}
function abrirComment(materia){
	var commentSelected = ('comment'+materia);
	var claseSelected = ('clase'+materia);
	var buttonSelected = ('btn-cerrar-comment'+materia);

	var movementSelected = (document.getElementById(claseSelected))
	var popupSelected = (document.getElementById(commentSelected));
	var timesSelected = (document.getElementById(buttonSelected));

	movementSelected.classList.add("active");
 	popupSelected.classList.add("active");
	timesSelected.classList.add("active")
	 
 	var reminder = localStorage.getItem(`reminder${materia}`);
 	document.getElementById(commentSelected).value = reminder;
}
function cerrarComment(materia){
	var commentSelected = ('comment'+materia);
	var claseSelected = ('clase'+materia);
	var buttonSelected = ('btn-cerrar-comment'+materia);

	var reminder = document.getElementById(commentSelected).value;
	localStorage.setItem(`reminder${materia}`, reminder);

	var movementSelected = (document.getElementById(claseSelected));
	var popupSelected = (document.getElementById(commentSelected));
	var timesSelected = (document.getElementById(buttonSelected));

	movementSelected.classList.remove("active");
 	popupSelected.classList.remove("active");
	timesSelected.classList.remove("active")
}
function copyData(materia){
	var dataSelected = ('copiedElement'+materia)

	var aux = document.createElement("input");
 	aux.setAttribute("value",document.getElementById(dataSelected).innerHTML);
 	document.body.appendChild(aux);
 	aux.select();
	document.execCommand("copy");
 	document.body.removeChild(aux);
 	alert("Información copiada correctamente.")
}
function copyMail(materia){
	var mailSelected = ('copiedMail'+materia)

	var aux = document.createElement("input");
 	aux.setAttribute("value",document.getElementById(mailSelected).innerHTML);
 	document.body.appendChild(aux);
 	aux.select();
	document.execCommand("copy");
 	document.body.removeChild(aux);
 	alert("Correo copiado correctamente.")
}
function darkmode(){
	headChange.classList.toggle('dark');
	backgroundChange.classList.toggle('dark');

	for(i = 0; i<darkButton.length; i++){
		darkButton[i].classList.toggle('dark');
	}
	for(i = 0; i<cardChange.length; i++){
		cardChange[i].classList.toggle('dark')
	}
	for(i = 0; i<buttonChange.length; i++){
		buttonChange[i].classList.toggle('dark')
	}
	for(i = 0; i<buttonCommChange.length; i++){
		buttonCommChange[i].classList.toggle('dark')
	}
	for(i = 0; i<subtitlesChange.length; i++){
		subtitlesChange[i].classList.toggle('dark')
	}
	for(i = 0; i<gridChange.length; i++){
		gridChange[i].classList.toggle('dark');
	}
}
function agregarInfo(){
	if(localStorage.getItem('profile')){
		if(topic.value ==''){
			alert('Ingrese datos válidos')
		}
		else{
			for (let i = 0; i>-1; i++){
				if(localStorage.getItem(`dataClass${i}`)){
					continue;
				}
				else {
					var data = {'topic':`${topic.value}`,
					'topiclnk':`${topiclnk.value}`,
					'time':`${time.value}`,
					'days':`${days.value}`,
					'teacher':`${teacher.value}`,
					'teacherMail':`${teacherMail.value}`,
					'zoom':`${zoom.value}`};
					localStorage.setItem(`dataClass${i}`, JSON.stringify(data))
					console.log(i);
					break;
				}
			}
			remove();
			useInfo();
			cerrarForm();
			console.log("Terminé")
		}
	}
	else{
		alert("Necesitas crear un perfil primero.")
	}
}
function useInfo(){
	var cont;
	console.log("inicio");

	if(localStorage.getItem('profile')){
		const prof = JSON.parse(localStorage.getItem('profile'));
		headChange.textContent = `¡Bienvenido, ${prof.name}!`;
		console.log(prof.name)
	}
	else{
		headChange.textContent = "¡Bienvenido!";
	}
    for(let i = 0; i>-1; i++){
        if (localStorage.getItem(`dataClass${i}`)){
            var newClass = document.createElement("div");
            var newDiv = document.createElement("div");
            var title = document.createElement("a");
            var book = document.createElement("a");
            var comment = document.createElement("a");
            var is = document.createElement("i");
            var ic = document.createElement("i");
            var gridParent = document.createElement("div");
            var gridChild1 = document.createElement("div");
            var gridChild2 = document.createElement("div");
            var gridChild3 = document.createElement("div");
            var gridChild4 = document.createElement("div");
            var gridtitle1 = document.createElement("h2");
            var gridtitle2 = document.createElement("h2");
            var gridtitle3 = document.createElement("h2");
            var gridtitle4 = document.createElement("h2");
            var gridElement1 = document.createElement("p");
            var gridElement2 = document.createElement("p");
            var gridElement3 = document.createElement("a");
			var gridElement4 = document.createElement("a");
			var data = JSON.parse(localStorage.getItem(`dataClass${i}`));
        
            var textarea = document.createElement("textarea");
            var txtaBtn = document.createElement("a");
			var btnIcon = document.createElement("i");
			var copiedDataMail = document.createElement("p");

			newClass.classList.add(data["topic"]);
			newClass.setAttribute("id", `active${i}`)
            newClass.appendChild(newDiv);
            newDiv.classList.add("area_class")
            newDiv.setAttribute("id", `claseactive${i}`)
            newDiv.appendChild(title);
            newDiv.appendChild(comment);
            newDiv.appendChild(book);
            newDiv.appendChild(gridParent).classList.add("area_class-card")

			gridElement4.setAttribute('target', '_blank');
			title.textContent = data.topic; 
			title.setAttribute('href', data.topiclnk);
			title.setAttribute('target', '_blank');
			book.appendChild(is).classList.add("fas", "fa-book");
			book.addEventListener('click', ()=>{
				abrirPopup(`active${i}`);
			})
			comment.appendChild(ic).classList.add("fas", "fa-comment");
			comment.addEventListener('click', ()=>{
				abrirComment(`active${i}`);
			})

            gridParent.appendChild(gridChild1).classList.add("area_class-card-grid");
            gridParent.appendChild(gridChild2).classList.add("area_class-card-grid");
            gridParent.appendChild(gridChild3).classList.add("area_class-card-grid");
            gridParent.appendChild(gridChild4).classList.add("area_class-card-grid");

			gridChild1.appendChild(gridtitle1)
			gridtitle1.textContent = "Horario";
			gridChild1.appendChild(gridElement1)
			gridElement1.textContent = data.time;
			gridChild2.appendChild(gridtitle2)
			gridtitle2.textContent = "Días";
			gridChild2.appendChild(gridElement2)
			gridElement2.textContent = data.days; 
			gridChild3.appendChild(gridtitle3)
			
			gridtitle3.textContent = "Maestro";
			gridChild3.appendChild(gridElement3).setAttribute("href","#");
			gridElement3.textContent = data.teacher;
			gridElement3.addEventListener('click', ()=>{
				copyMail(`active${i}`);
			})
			gridChild3.appendChild(copiedDataMail);
			copiedDataMail.textContent = data.teacherMail;
			copiedDataMail.classList.add("copiedMail");
			copiedDataMail.setAttribute("id", `copiedMailactive${i}`)

			gridChild4.appendChild(gridtitle4)
			gridtitle4.textContent = "Zoom";
            gridChild4.appendChild(gridElement4).setAttribute("href", data.zoom);
            gridElement4.textContent = "Ir a Zoom";

            title.classList.add("area_class-title","title");
            book.classList.add("area_class-button");
            comment.classList.add("area_class-button-com");

            newDiv.appendChild(textarea).classList.add("input_comment");
            textarea.setAttribute("id", `commentactive${i}`)
            newDiv.appendChild(txtaBtn).appendChild(btnIcon).classList.add("fas", "fa-times");
            txtaBtn.classList.add("button-close-comment");
			txtaBtn.setAttribute("id",`btn-cerrar-commentactive${i}`)
			txtaBtn.addEventListener('click', ()=>{
				cerrarComment(`active${i}`);
			})
                
                
            var container = document.createElement("div");
            var areaClassData = document.createElement("div");
			var areaDataTitle = document.createElement("h2");
			
			var profile = JSON.parse(localStorage.getItem('profile'));
            var studentData = document.createElement("p");
            var groupData = document.createElement("p");
            var topicData = document.createElement("p");
            var dateData = document.createElement("p");
            var teacherData = document.createElement("p");
            var schoolData = document.createElement("p");
			var numberData = document.createElement("p");
			var copiedData = document.createElement("p");

            var xButton = document.createElement("a");
            var copyButton = document.createElement("a");
            var ix = document.createElement("i");
            var ib = document.createElement("i");
            newClass.appendChild(container).classList.add("overlay");
            container.appendChild(areaClassData).classList.add("area_classdata");
            container.setAttribute("id", `overlayactive${i}`);
                
            xButton.appendChild(ix).classList.add("fas", "fa-times");
            xButton.classList.add("area_class-button");
                
            xButton.onclick = function() {cerrarPopup(`active${i}`)};
            copyButton.appendChild(ib).classList.add("fas", "fa-copy");
			copyButton.classList.add("btn-copi");
			copyButton.addEventListener('click', ()=>{
				copyData(`active${i}`);
			})

            areaClassData.appendChild(xButton);
			areaClassData.appendChild(areaDataTitle);
			areaDataTitle.textContent = "Datos de Clase";
			areaClassData.appendChild(studentData);
			studentData.textContent = `Alumno: ${profile.name} ${profile.lastname}`;
			areaClassData.appendChild(groupData);
			groupData.textContent = `Grupo: ${profile.group}`;
			areaClassData.appendChild(topicData);
			topicData.textContent = `Materia: ${data.topic}`;
			areaClassData.appendChild(dateData);
			dateData.textContent = `Fecha: XX/XX/XX`;
			areaClassData.appendChild(teacherData);
			teacherData.textContent = `Maestro: ${data.teacher}`;
			areaClassData.appendChild(schoolData);
			schoolData.textContent = `Escuela: ${profile.school}`;
			areaClassData.appendChild(numberData);
			numberData.textContent = `Matrícula: ${profile.number}`;
			areaClassData.appendChild(copiedData);
			copiedData.textContent = "Alumno: "+(profile["name"])+" "+(profile["lastname"])+" Grupo: "+(profile["group"])+" Materia: "+(data["topic"])+" Fecha: XX/XX/XX Maestro: "+(data["teacher"])+" Escuela: "+(profile["school"])+" Expediente: "+(profile["number"])+"";
			copiedData.classList.add('copiedElement');
			copiedData.setAttribute("id", `copiedElementactive${i}`);

            areaClassData.appendChild(copyButton);

            var currentDiv = document.getElementById("area");
            currentDiv.appendChild(newClass);
            console.log(`element ${i} creado.`);
        }
        else{
        console.log("break")
        break;
        }
	}
	darkMD();
	cont = 1;
	console.log(cont)
}
function remove(){
	var parent = document.getElementById("area");
	for(let i = 0; i>-1; i++){
		var child = document.getElementById(`active${i}`);
		if (child){
			parent.removeChild(child);
			console.log(i);
		}
		else{
			console.log("terminé");
			break;
		}
	}
}
function openProfile(){
	var profile = document.getElementById('overlay_profile')
	if(localStorage.getItem('profile')){
		prof = JSON.parse(localStorage.getItem('profile'));
		name.value = prof['name'];
		lastname.value = prof['lastname'];
		group.value = prof['group'];
		school.value = prof['school'];
		number.value = prof['number'];
	}

	profile.classList.add('active')
}
function closeProfile(){
	profile.classList.remove('active')
}
function updateProfile(){
	if(name.value==''){
		alert('Ingrese datos válidos')
	}
	else{
		var data = {'name':`${name.value}`,
		'lastname':`${lastname.value}`,
		'group':`${group.value}`,
		'school':`${school.value}`,
		'number':`${number.value}`};

		localStorage.setItem('profile', JSON.stringify(data));

		closeProfile();
		remove()
		useInfo();
		profile.classList.remove('active');
		console.log("Terminé");
	}
}

function eraseClass(){
	var card = document.getElementById('erase-card');

	var inner = document.createElement('div');
	card.appendChild(inner);
	inner.setAttribute('id','eraseCardI');

	for (let i = 0; i>-1; i++){
		if(localStorage.getItem(`dataClass${i}`)){
			var data = JSON.parse(localStorage.getItem(`dataClass${i}`));
                
            var optionE = document.createTextNode((data["topic"]));
			var option = document.createElement("a");
			var trash = document.createElement("a");
			var trashI = document.createElement("i");

			trashI.classList.add('fas','fa-trash-alt');
			trash.appendChild(trashI);
			trash.classList.add('trashS');
			inner.appendChild(option).appendChild(optionE);
			option.appendChild(trash);
			option.setAttribute('id', `dataClass${i}`);
			option.classList.add('eraseform');

			option.onclick= function() {erase(i)};
		}
		else{
			break;
		}
	}
	eraseForm.classList.add('active');
}
function erase(vS){
	console.log(vS);
	classSelected = document.getElementById(`dataClass${vS}`);
	classSelected.classList.toggle('trash');
	console.log(classSelected);
}
function closeECard(){
	var eraseCard = document.getElementById('erase-card');
	var inner = document.getElementById('eraseCardI');
	eraseCard.removeChild(inner);
	eraseForm.classList.remove('active');
}
function permRem(){
	var eForms = document.getElementsByClassName('eraseform');
	var classFR = document.getElementsByClassName('trash');
	var el = [];
	var save = [];
	var data = [];
	for(let i = 0; i<eForms.length; i++){
		for(let j = 0; j<classFR.length; j++){
			if(classFR[j]==eForms[i]){
				el.push(i);
			}
		}
	}
	for(let i = 0; i<eForms.length; i++){
		save.push(i);
	}
	for(let i = 0; i<eForms.length; i++){
		for(let j = 0; j<classFR.length; j++){
			if(save[i]==el[j]){
				delete save[i];
			}
		}
	}
	console.log(save);
	for(let i = 0; i<eForms.length; i++){
		var info = localStorage.getItem(`dataClass${i}`);
		if(save[i]!=null){
			data.push(info);
		}
	}
	for(let i = 0; i<eForms.length; i++){
		localStorage.removeItem(`dataClass${i}`);
		console.log('bye'+i)
		if(data[i]){
			var info = (data[i]);
			console.log(info);
			localStorage.setItem(`dataClass${i}`, info);
			console.log(data[i]+' agregado');
		}
	}
	closeECard();
	remove();
	useInfo();
}
function darkMD(){
	var title = document.getElementById('title');
	if(title.classList.contains('dark')){
		for(i = 0; i<cardChange.length; i++){
			cardChange[i].classList.toggle('dark')
		}
		for(i = 0; i<buttonChange.length; i++){
			buttonChange[i].classList.toggle('dark')
		}
		for(i = 0; i<buttonCommChange.length; i++){
			buttonCommChange[i].classList.toggle('dark')
		}
		for(i = 0; i<subtitlesChange.length; i++){
			subtitlesChange[i].classList.toggle('dark')
		}
		for(i = 0; i<gridChange.length; i++){
			gridChange[i].classList.toggle('dark');
		}
	}
}
function editClass(){
	var card = document.getElementById('edit-card');
	var inner = document.createElement('div');
	card.appendChild(inner);
	inner.setAttribute('id','editCardI');

	for (let i = 0; i>-1; i++){
		if(localStorage.getItem(`dataClass${i}`)){
			var data = JSON.parse(localStorage.getItem(`dataClass${i}`));
                
            var optionE = document.createTextNode((data["topic"]));
			var option = document.createElement("a");
			var edit = document.createElement("a");
			var editI = document.createElement("i");

			editI.classList.add('fas','fa-edit');
			edit.appendChild(editI);
			edit.classList.add('editS');
			inner.appendChild(option).appendChild(optionE);
			option.appendChild(edit);
			option.setAttribute('id', `dataClass${i}`);
			option.classList.add('editform');

			option.onclick= function() {edition(i)};
		}
		else{
			break;
		}
	}
	editCard.classList.add('active');
}
function edition(vS){
	console.log(vS);
	classSelected = document.getElementById(`dataClass${vS}`);
	classSelected.classList.toggle('edit');
	console.log(classSelected);
}
function closeEdit(){
	var eCard = document.getElementById('edit-card');
	var inner = document.getElementById('editCardI');
	eCard.removeChild(inner);

	editCard.classList.remove('active');
}
function editOption(){
	if(edElement.length > 1){
		alert('Solo puede elegir una materia');
	}
	else{
		for( let i = 0; i<elements.length; i++){
			if (elements[i] == edElement[0]){
				var editOb = i;
				break;
			}
		}
		console.log(editOb);
		var data = JSON.parse(localStorage.getItem(`dataClass${editOb}`));
		topiced.value = data['topic'];
		topiclnked.value = data['topiclnk'];
		timeed.value = data['time'];
		daysed.value = data['days'];
		teachered.value = data['teacher'];
		teacherMailed.value = data['teacherMail'];
		zoomed.value = data['zoom'];
		edSet.classList.add('active');
	}	
}
function closeEditOption(){
	topiced.value = null;
	topiclnked.value = null;
	timeed.value = null;
	daysed.value = null;
	teachered.value = null;
	teacherMailed.value = null;
	zoomed.value = null;
	edSet.classList.remove('active');
}
function sendEditS(){
	if(topiced.value ==''){
		alert('Ingrese datos válidos')
	}
	else{
		for( let i = 0; i<elements.length; i++){
			if (elements[i] == edElement[0]){
				var editOb = i;
				break;
			}
		}
		var data = {'topic':`${topiced.value}`,
			'topiclnk':`${topiclnked.value}`,
			'time':`${timeed.value}`,
			'days':`${daysed.value}`,
			'teacher':`${teachered.value}`,
			'teacherMail':`${teacherMailed.value}`,
			'zoom':`${zoomed.value}`};
		localStorage.setItem(`dataClass${editOb}`, JSON.stringify(data))
		console.log(editOb);
		remove();
		useInfo();
		closeEdit();
		closeEditOption();
		console.log("Terminé")
	}
}