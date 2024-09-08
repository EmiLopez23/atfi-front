"use client";
import styles from "./registerForm.module.scss";
import TextField from "@/components/textField/textField";
import Select from "@/components/select/Select";
import Button from "@/components/button/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {validateRegister, isRegisterValid, RegisterData} from "@/utils/auth.validation";

export default function RegisterForm() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Partial<RegisterData>>({});
    const options = [
        { value: "Argentina", title: "🇦🇷 Argentina" },
        { value: "Uruguay", title: "🇺🇾 Uruguay" },
        { value: "Chile", title: "🇨🇱 Chile" },
        { value: "Brasil", title: "🇧🇷 Brasil" },
    ];
    const [formData, setFormData] = useState({
        email: '',
        country: '',
        phone: '',
        name: '',
        lastName: '',
        cuit: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const validationErrors = validateRegister({ ...formData, password, confirmPassword });
        if (!isRegisterValid(validationErrors)) {
            setErrors(validationErrors);
            toast.error('Por favor, corrija los errores en el formulario.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }

        const dataToSend = { ...formData, password };
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                const error = await response.json();
                toast.error(error.message);
                return;
            }
            const result = await response.json();
            document.cookie = `session=${result.token}`;
            router.push('/home');
        } catch (e) {
            toast.error('Hubo un problema con el registro.');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Select
                placeholder="Seleccioná tu país"
                name="country"
                options={options}
                label="País"
                onChange={handleInputChange}
                error={!!errors.country}
                helperText={errors.country}
            />
            <TextField
                placeholder="🇦🇷 +54"
                name="phone"
                label="Teléfono"
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
            />
            <TextField
                placeholder="Ingresá tu nombre"
                name="name"
                label="Nombre"
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                placeholder="Ingresá tu apellido"
                name="lastName"
                label="Apellido"
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
            />
            <TextField
                placeholder="Ingresá tu CUIT"
                name="cuit"
                label="CUIT"
                onChange={handleInputChange}
                error={!!errors.cuit}
                helperText={errors.cuit}
            />
            <TextField
                placeholder="Ingresá tu email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá tu Contraseña"
                name="password"
                label="Contraseña"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
            />
            <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
            <Button variant="primary" size="lg" className={styles.buttonContainer}>
                Continuar
            </Button>
        </form>
    );
}