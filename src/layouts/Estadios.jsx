import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { IoReloadSharp, IoAddOutline, IoPeopleOutline, IoPersonOutline, IoEarthOutline, IoLocationOutline, IoFootballOutline } from 'react-icons/io5';

const Estadios = () => {

    const URL = "http://localhost:3000/historial/estadios"

    const [estadios, setEstadios] = useState([]);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');

    const [operacion, setOperacion] = useState(1);
    const [titulo, setTitulo] = useState('');

    useEffect(()=>{
        getEstadios()
    },[]);

    const getEstadios = async ()=>{
        try {
            const respuesta = await axios.get(URL);
            setEstadios(respuesta.data);
        } catch (error) {
            console.log(error)
        }
    }

    const openModal = async(op, id, nombre, pais, ciudad)=>{
        try {
            setOperacion();
            setTitulo('')
            setNombre('');
            setPais('');
            setCiudad('');
            if(op === 1){
                setOperacion(1);
                setTitulo("Agregar nuevo estadio");
            }else if(op === 2){
                setOperacion(2);
                setTitulo("Actualizar estadio");
                setId(id);
                setNombre(nombre);
                setPais(pais);
                setCiudad(ciudad);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const opera = async()=>{
        if(operacion === 1){
            try {
                const respuesta = await axios.post(URL, { nombre: nombre, pais: pais, ciudad:ciudad });
                if(respuesta.status === 200 && respuesta.data){
                    // Muestra la alerta de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro Exitoso',
                        text: '¡Nuevo Estadio Agregado!',
                        showConfirmButton: false,
                        timer: 1500}).then(()=>{
                            window.location.href = '/estadios'
                    });
                }
            } catch (error) {
                if (error.response.status === 400) {
                    Swal.fire({
                        title: 'Error',
                        text: error.response.data,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        }else if(operacion===2){
            try {
                Swal.fire({
                    title: '¿Estas seguro/a?',
                    text: "Vas a actualizar el estadio!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Actualizar Estadio!'
                    }).then(async(result) => {
                    if (result.isConfirmed) {
                        try {
                            const respuesta = await axios.put(`${URL}/${id}`, { nombre: nombre, pais: pais, ciudad:ciudad });
                            if(respuesta.status === 200 && respuesta.data){
                                Swal.fire({
                                    icon: 'success',
                                    title: `${respuesta.data}`,
                                    showConfirmButton: false,
                                    timer: 1500}).then(()=>{
                                        window.location.href = '/estadios'
                                });
                            }
                        } catch (error) {
                            if (error.response.status === 400) {
                                Swal.fire({
                                    title: 'Error',
                                    text: error.response.data,
                                    icon: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                            }
                        }
                    }
                    });
            } catch (error) {
                
            }
            console.log(respuesta.data);
            location.reload();
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='container'>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal(1)}><IoAddOutline style={{fontSize: '25px'}}/> Agregar Estadio</button>
                </div>
                <table className='table text-center border mt-4'>
                    <thead className='border' style={{background: '#e9edee'}}>
                        <tr>
                            <th>Nombre Estadio</th>
                            <th>Pais</th>
                            <th>Ciudad</th>
                            <th>Actualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estadios.map((estadios)=>(
                            <tr key={estadios._id}>
                                <td>{estadios.nombre}</td>
                                <td>{estadios.pais}</td>
                                <td>{estadios.ciudad}</td>
                                <td>
                                    <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=> openModal( 2, estadios._id, estadios.nombre, estadios.pais, estadios.ciudad )}><IoReloadSharp /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><IoFootballOutline/></span>
                            <input type="text" className="form-control" placeholder="Nombre Estadio" aria-label="Nombre Estadio" value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><IoEarthOutline/></span>
                            <input type="text" className="form-control" placeholder="País" aria-label="País" value={pais} onChange={(e)=> setPais(e.target.value)}/>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><IoLocationOutline/></span>
                            <input type="text" className="form-control" placeholder="Ciudad" aria-label="Ciudad" value={ciudad} onChange={(e)=> setCiudad(e.target.value)}/>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={()=> opera()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Estadios;
