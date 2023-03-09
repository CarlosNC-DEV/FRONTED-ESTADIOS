import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
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
            const respuesta = await axios.post(URL, { nombre: nombre, pais: pais, ciudad:ciudad });
            console.log(respuesta.data);
            location.reload();
        }else if(operacion===2){
            const respuesta = await axios.put(`${URL}/${id}`, { nombre: nombre, pais: pais, ciudad:ciudad });
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
                        <th>Nombre Estadio</th>
                        <th>Pais</th>
                        <th>Ciudad</th>
                        <th>Actualizar</th>
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
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoFootballOutline/></span>
                            <input type="text" class="form-control" placeholder="Nombre Estadio" aria-label="Nombre Estadio" value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoEarthOutline/></span>
                            <input type="text" class="form-control" placeholder="País" aria-label="País" value={pais} onChange={(e)=> setPais(e.target.value)}/>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><IoLocationOutline/></span>
                            <input type="text" class="form-control" placeholder="Ciudad" aria-label="Ciudad" value={ciudad} onChange={(e)=> setCiudad(e.target.value)}/>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onClick={()=> opera()}>Guardar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Estadios;
