"use client";


import {ChangeEvent, FormEvent, useState} from 'react';
import styles from './contact_section.module.scss';
import TextField from "@/components/textField/textField";
import emailjs from 'emailjs-com';
import Image from 'next/image';
import contactUsImage from "@assets/images/agriculture/contact_us.webp"


interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}
function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let formErrors: { [key: string]: string }  = {};

        if (!formData.name) formErrors.Name = 'El nombre es requerido.';
        if (!formData.phone) formErrors.phone = 'El numero de telefono es requerido.';
        if (!formData.email) {
            formErrors.email = 'El email es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'El email no es válido.';
        }
        if (!formData.message) formErrors.message = 'El mensaje es requerido.';

        return formErrors;
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validate();

        if (Object.keys(formErrors).length === 0) {
            try {
                const templateParams = {
                    from_name: `${formData.name} ${formData.phone}, from: ${formData.email}`,
                    message: formData.message,
                };

                const result = await emailjs.send(
                    'service_8tsp608',
                    'template_ykkb7d4',
                    templateParams,
                    'HujsxbtHyu8aGBM1x'
                );

                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                });
                setErrors({});
                location.reload();
            } catch (error) {
                console.error("Error sending email:", error);

            }
        } else {
            console.log("Form errors", formErrors);
            setErrors(formErrors);
        }
    };

    return (
        <div className={styles.contactFormContainer} >
            <h2 className={styles.heading}>Comenzá la transformación digital de tu campaña agricola</h2>
            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <Image
                        alt="Contact us"
                        className={styles.image}
                        src={contactUsImage.src}
                        width={contactUsImage.width}
                        height={contactUsImage.height}
                    />
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h4>Contactanos para mas información</h4>
                    <TextField placeholder="Nombre y Apellido" name="name" onChange={handleChange} />
                    <TextField placeholder="Email" name="email" onChange={handleChange}/>
                    <TextField type={"number"} placeholder="Teléfono" name="phone" onChange={handleChange}/>
                    <TextField rows={4} type={"textarea"} placeholder="Mensaje" name="message" onChange={handleChange}/>
                    <button type="submit" className={styles.submitButton}>Enviar</button>
                </form>
            </div>
        </div>
    );
}


export default ContactForm;
