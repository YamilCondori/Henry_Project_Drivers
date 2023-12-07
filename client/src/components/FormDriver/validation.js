

export const validation=(driverData)=>{
    const errors={}
    // const { name, image, nationality, birthdate, description, speed, height, weight }= driverData
    const hasNumbers= /\d/

    if(!driverData.name) errors.name = 'Por favor ingrese un nombre'
    if(driverData.name !== driverData.name.toLowerCase()) errors.name='El nombre debe estar en minusculas'
    if(hasNumbers.test(driverData.name)) errors.name='El nombre no puede contener números'
    if(driverData.name.length > 64) errors.name= 'El nombre no puede ser tan largo'

    if(!driverData.surname) errors.surname = 'Por favor ingrese un nombre'
    if(driverData.surname !== driverData.surname.toLowerCase()) errors.surname='El nombre debe estar en minusculas'
    if(hasNumbers.test(driverData.surname)) errors.surname='El nombre no puede contener números'

    if(!driverData.nationality) errors.nationality='Este campo no puede estar vacío'
    if(driverData.nationality.length > 20) errors.nationality='Demasiados caracteres'
    if(hasNumbers.test(driverData.nationality)) errors.nationality='Este campo no puede contener numeros'

    if(!driverData.birthdate) errors.birthdate='Este campo no puede estar vacío'

    return errors    
}
