import './App.css'
import { useForm,useController } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from "zod"


const UserDetails=z.object({
  name: z.string().min(3),
  email: z.string().email(),
  website: z.string().url(),
  work: z.string()
})

interface SuperheroOption {
  label: string
  value: string
}


function App() {
  const superheroVal: SuperheroOption[] = [
    { label: 'Personal', value: 'personal' },
    { label: 'Full-Time', value: 'full-time' },
    { label: 'Freelancing', value: 'freelancing' }
  ]
  const {register,handleSubmit,control,formState}=useForm({resolver:zodResolver(UserDetails)})
  const {errors}=formState
  const {field}=useController({name:'work',control})
  const handleOnSubmit=(formValues:Record<string, any>)=>{
    console.log('Form values is: ',formValues)
  }
  const handleDropDownChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    console.log('Changed value')
    field.onChange(event.target.value)
  }
  return (
    <div className='custom-form'>
      <h1>Portfolio Details</h1>
      <form onSubmit={handleSubmit(handleOnSubmit)}> 
        <label>Name</label>
        <input type='text' placeholder='Enter your name'  {...register('name')}/>
        {errors.name && <div style={{ color: 'red' }}>{errors.name.message?.toString()}</div>}
        <label>Email</label>
        <input type='text' placeholder='Enter your email' {...register('email')}/>
        {errors.email && <div style={{ color: 'red' }}>{errors.email.message?.toString()}</div>}
        <label>Website</label>
        <input type='text' placeholder='Enter your website link' {...register('website')}/>
        {errors.website && <div style={{ color: 'red' }}>{errors.website.message?.toString()}</div>}
        <label>Type of work</label>
        <select name="work" value={field.value} onChange={handleDropDownChange}>
        {superheroVal.map(value => <option value={value.value} key={value.value}>{value.label}</option>)}
        </select>
        {errors.work && <div style={{ color: 'red' }}>{errors.work.message?.toString()}</div>}
        <button type='submit'>Save Changes</button>
      </form>
    </div>
  )
}

export default App
