import  Z  from "zod";

export const registerSchema = Z.object({
    username: Z.string({
        required_error: "Username is required"
    }),
    email: Z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    phoneNumber: Z.string({
        required_error: "Phone number is required"
    }).min(10, {
        message: "Invalid phone number"
    }),
    password: Z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
    confirmPassword: Z.string({
        required_error: "Confirmation of the password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
    apartment : Z.string({
        required_error: "Apartament is required"
    })
});

export const adminSchema = Z.object({
    username: Z.string({
        required_error: "Username is required"
    }),
    email: Z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    phoneNumber: Z.string({
        required_error: "Phone number is required"
    }).min(10, {
        message: "Invalid phone number"
    }),
    password: Z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
    confirmPassword: Z.string({
        required_error: "Confirmation of the password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
    name: Z.string({
        required_error: "Name is required"
    }),
    address: Z.string({
    required_error: 'Address is required'
    }),
    city: Z.string({
        required_error: `City is required`
    }),
    state: Z.string({
        required_error: `State is required`
    }),
    postalCode: Z.string({
        required_error: 'Postal code is required' 
    })
});

export const loginSchema = Z.object({
    username: Z.string({
        required_error: "Username is required"
    }),
    password: Z.string({
        required_error: "Password is required"
    })
})

export const residenceSchema = Z.object({
    name: Z.string({
        required_error: "Name is required"
    }),
    numberOfResidents: Z.number({
        required_error: "Number of recidents is required"
    }),
    emergencyNumber: Z.string({
        required_error: "Emergency number is required"
    }).min(10, {
        message: "Invalid phone number"
    }),
    address: Z.string({
    required_error: 'Address is required'
    }),
    city: Z.string({
        required_error: `City is required`
    }),
    state: Z.string({
        required_error: `State is required`
    }),
    postalCode: Z.string({
        required_error: 'Postal code is required' 
    })
});