"use client"

import { auth } from "@/firebase/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/lib/actions/auth.actions"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// const authFormSchema = (type: FormType) => {
//     return z.object({
//         name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
//         email: z.string().email(),
//         password: z.string().min(3),
//     });
// };
const authFormSchema = (type: FormType) => {
    return z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        college: z.string().min(1, "College is required"),
        rollNumber: z.string().optional(),
        course: z.string().optional(),
        branch: z.string().optional(),
        year: z.string().optional(),
        semester: z.string().optional(),
        dob: z.string().optional(),
        gender: z.string().optional(),
        phone: z.string().optional(),
        // ✅ New fields
        collegeCode: z.string().optional(),
        affiliation: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pinCode: z.string().optional(),
        contactEmail: z.string().email("Invalid email").optional(),
        contactPhone: z.string().optional(),
        departments: z.array(
            z.object({
                name: z.string().min(1, "Department name is required"),
            })
        ),
        courses: z.array(
            z.object({
                name: z.string().min(1, "Course name is required"),
            })
        ),
    });
};

const CollegeAuthForm = ({ type }: { type: FormType }) => {

    const router = useRouter()
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            college: "",
            course: "",
            phone: "",
            collegeCode: "",
            affiliation: "",
            address: "",
            city: "",
            state: "",
            pinCode: "",
            departments: [{ name: "" }], // start with one empty department
            courses: [{ name: "" }], // start with one empty course
        },
    });
    const { fields: deptFields, append: addDept, remove: removeDept } =
        useFieldArray({
            control: form.control,
            name: "departments",
        });

    const { fields: courseFields, append: addCourse, remove: removeCourse } =
        useFieldArray({
            control: form.control,
            name: "courses",
        });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                // const { name, email, password } = values;
                const { name, email, password, college, rollNumber, course, branch, year, semester, dob, gender, phone } = values;

                const userCredentails = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const result = await signUp({
                    uid: userCredentails.user.uid,
                    name: name!,
                    email,
                    password,
                    college,
                    rollNumber,
                    course,
                    branch,
                    year,
                    semester,
                    dob,
                    gender,
                    phone
                })
                if (!result?.success) {
                    toast.error(result?.message);
                    return;
                }

                toast.success('Account created successfull Please sign in.')
                router.push('/sign-in')
            } else {
                const { email, password } = values;
                const userCredentails = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentails.user.getIdToken();
                if (!idToken) {
                    toast.error('Sign in faild')
                    return;
                }
                await signIn({
                    email, idToken
                })

                toast.success('Sign in successfully')
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }
    }
    const states = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ];
    const colleges = [
        "Hi-Tech Institute of Technology, Aurangabad",
        "Government College of Engineering, Aurangabad",
        "Maharashtra Institute of Technology (MIT), Aurangabad",
        "Chhatrapati Shahu College of Engineering, Aurangabad",
        "Deogiri Institute of Engineering & Management Studies, Aurangabad",
        "P.E.S. College of Engineering, Aurangabad",
        "Shreeyash College of Engineering and Technology, Aurangabad",
        "Aurangabad College of Engineering, Aurangabad",
        "Dr. Babasaheb Ambedkar Marathwada University (BAMU), Aurangabad",
        "Indian Institute of Technology, Bombay",
        "Veermata Jijabai Technological Institute (VJTI), Mumbai",
        "College of Engineering, Pune",
        "MIT World Peace University (MIT-WPU), Pune",
        "Vishwakarma Institute of Technology (VIT), Pune",
        "Pune Institute of Computer Technology (PICT), Pune",
        "Army Institute of Technology (AIT), Pune",
        "Jawaharlal Nehru Engineering College (JNEC), Aurangabad",
        "G.S. Mandal's Maharashtra Institute of Technology (MIT), Aurangabad",
        "Dwarkadas J. Sanghvi College of Engineering, Mumbai",
        "Sardar Patel Institute of Technology, Mumbai",
        "K. J. Somaiya College of Engineering, Mumbai",
    ];
    const affiliations = [
        "Dr. Babasaheb Ambedkar Technological University",
        "Savitribai Phule Pune University",
        "Shivaji University",
        "SPPU Autonomous",
        "Mumbai University",
        "Other",
    ];

    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">TechnoTalk</h2>
                </div>
                <h3>Practice job interview with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">

                        {!isSignIn && (
                            <>
                                <Controller
                                    control={form.control}
                                    name="college"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange} // tell RHF to update value
                                            value={field.value}            // controlled value
                                        >
                                            <SelectTrigger className="input w-full">
                                                <SelectValue placeholder="Select your college" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {colleges.map((collegeName) => (
                                                    <SelectItem key={collegeName} value={collegeName}>
                                                        {collegeName}
                                                    </SelectItem>
                                                ))}

                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="collegecode"
                                    label="Phone"
                                    placeholder="Your College Code"
                                    type="text"
                                />


                                <Controller
                                    control={form.control}
                                    name="affiliation"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange} // tell RHF to update value
                                            value={field.value}            // controlled value
                                        >
                                            <SelectTrigger className="input w-full">
                                                <SelectValue placeholder="Affiliation / University" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {affiliations.map((aff) => (
                                                    <SelectItem key={aff} value={aff}>
                                                        {aff}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange} // tell RHF to update value
                                            value={field.value}            // controlled value
                                        >
                                            <SelectTrigger className="input w-full">
                                                <SelectValue placeholder="State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {states.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    label="Phone"
                                    placeholder="Your College Address"
                                    type="text"
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    label="Phone"
                                    placeholder="Your College City"
                                    type="text"
                                />
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    label="Phone"
                                    placeholder="City PinCode"
                                    type="text"
                                />
                                <Controller
                                    control={form.control}
                                    name="course"
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange} // tell RHF to update value
                                            value={field.value}            // controlled value
                                        >
                                            <SelectTrigger className="input w-full">
                                                <SelectValue placeholder="Course" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="BTech (Bachelor of Technology)">BTech (Bachelor of Technology)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                {deptFields.map((field, index) => (
                                    <div key={field.id}>
                                        <FormField
                                            control={form.control}
                                            name={`departments.${index}.name`}
                                            label={`Department ${index + 1}`}
                                            placeholder="Enter department name"
                                            type="text"
                                        />
                                        <Button
                                            className="mt-4"
                                            type="button"
                                            variant="destructive"
                                            onClick={() => removeDept(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="secondary" className="bg-[#27282F]" onClick={() => addDept({ name: "" })}>
                                    + Add Department
                                </Button>


                                <FormField
                                    control={form.control}
                                    name="phone"
                                    label="Phone"
                                    placeholder="Your Phone"
                                    type="text"
                                />
                            </>

                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Phone"
                            placeholder="Your email address"
                            type="email"
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Phone"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an Accout'}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link
                        href={!isSignIn ? "/sign-in" : "/sign-up"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default CollegeAuthForm
