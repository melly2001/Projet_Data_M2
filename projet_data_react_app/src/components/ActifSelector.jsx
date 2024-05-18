import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import ActifElement from './ActifElement';
import ActifPieChart from './ActifPieChart';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const ActifSelector = ({listActifs, setListActifs, inputActif, setInputActif}) => {

    const updateInputActif = (text) => {
        setInputActif(text.toUpperCase())
    }

    const addActif = () => {
        console.log(inputActif)
        if (inputActif!=''){
            setListActifs([
                ...listActifs,
                {
                nom: inputActif,
                pourcent: 0
                }
            ]);
        };
        setInputActif('')
    };

    const updatePourcent = (nom,pourcent) => {
        const updatedPourcent=listActifs.map((actif)=>{
            if (actif.nom===nom){
                if (compute_sum_pourcent_without_actif(nom)+(+pourcent)<=100){
                    return {nom: nom, pourcent: pourcent}
                }
                else{
                    return {nom: nom, pourcent: 100-compute_sum_pourcent_without_actif(nom)}
                }

            }
            else {
                return actif
            }
        });
        setListActifs(updatedPourcent)
    };

    const removeActif = (nom) => {
        const updatedList = listActifs.filter((actif) => nom !== actif.nom);
        setListActifs(updatedList)
    };

    const compute_sum_pourcent = () => {
        var sum = 0;
        listActifs.map((actif)=>{
            sum+= +actif.pourcent
        });
        return sum
    };

    const compute_sum_pourcent_without_actif = (nom_actif) => {
        var sum = 0;
        listActifs.map((actif)=>{
            if (actif.nom !== nom_actif){
                sum+= +actif.pourcent
            }
        });
        return sum
    };

    return(
        <div className="d-flex flex-row border-bottom mx-5">
            <div className="w-50 p-5 border-end my-5">
                <Form>
                    <div className="d-flex flex-row justify-content-around">
                        <div className="w-50">
                            <FloatingLabel label="Ajouter un actif">
                                <Form.Control type="text" placeholder="Nom d'un actif" value={inputActif} onChange={(e)=>updateInputActif(e.target.value)}/>
                            </FloatingLabel>
                        </div>
                        <Button onClick={(e)=>addActif()} className="custom_button">Ajouter</Button>
                    </div>
                </Form>
                <div className="mt-5">
                    {listActifs.map((actif,index)=><ActifElement nom={actif.nom} pourcent={actif.pourcent} updatePourcent={updatePourcent} removeActif={removeActif}/>)}
                </div>
            </div>
            <div className="w-50 text-start">
                <ActifPieChart listActifs={listActifs} compute_sum_pourcent={compute_sum_pourcent}/>
            </div>
        </div>
    );
};

export default ActifSelector;