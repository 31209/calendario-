import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBFWGbqjp6Q2GdXZtJRRUUoqbSnF8U4yvA",
    authDomain: "calendarii-633dc.firebaseapp.com",
    projectId: "calendarii-633dc",
    storageBucket: "calendarii-633dc.firebasestorage.app",
    messagingSenderId: "324553155778",
    appId: "1:324553155778:web:9200c13e0bfcc14979c75b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos del DOM
const tituloInput = document.getElementById("titulo");
const fechaInput = document.getElementById("fecha");
const agregarBtn = document.getElementById("agregar");
const listaTareas = document.getElementById("lista-tareas");

// Cargar tareas desde Firestore
const cargarTareas = async () => {
    listaTareas.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "tareas"));
    
    querySnapshot.forEach((docSnap) => {
        const tarea = docSnap.data();
        const div = document.createElement("div");
        div.classList.add("tarea-card");
        div.innerHTML = `<strong>${tarea.titulo}</strong><br>${tarea.fecha} 
                        <button data-id="${docSnap.id}">X</button>`;
        
        listaTareas.appendChild(div);

        // Evento para eliminar tarea
        div.querySelector("button").addEventListener("click", async () => {
            await deleteDoc(doc(db, "tareas", docSnap.id));
            cargarTareas();
        });
    });
};

// Agregar tarea a Firebase
agregarBtn.addEventListener("click", async () => {
    const titulo = tituloInput.value.trim();
    const fecha = fechaInput.value;
    
    // Verificar si los campos están vacíos
    if (!titulo || !fecha) {
        alert("Por favor, ingresa la actividad y la fecha limite.");
    } else {
        await addDoc(collection(db, "tareas"), { titulo, fecha });
        tituloInput.value = "";
        fechaInput.value = "";
        cargarTareas();
    }
});

// Cargar tareas al iniciar
cargarTareas();
