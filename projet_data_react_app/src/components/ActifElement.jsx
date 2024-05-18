import Button from 'react-bootstrap/esm/Button';
import React, { useState } from 'react';
import FormRange from 'react-bootstrap/esm/FormRange';

const ActifElement = ({nom, pourcent, updatePourcent, removeActif}) => {

    return(
        <div className="d-flex flex-row align-items-center mt-4">
            <div className="w-25">
                {nom}
            </div>
            <div className="w-25">
                <FormRange onChange={(e)=>updatePourcent(nom,e.target.value)} value={pourcent}/>
            </div>
            <div className="w-25">
                {pourcent}%
            </div>
            <div className='w-25'>
                <Button onClick={()=>removeActif(nom)} className="custom_button">X</Button>
            </div>
        </div>
    );
};

export default ActifElement;