import { Input} from '@/common/components/Input'
import { appCtx } from '@/context/appCtx'
import React, { useContext,useState} from 'react'
import config from './config.json'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/common/services/validations'
import { updateStoreData } from '@/common/services/functions'
import axios from 'axios'
import Ajax from '@/common/services/ajax'
export const Login = ()=> {
    const [inputControls,setInputControls] = useState(config)
    const {dispatch} = useContext (appCtx)
    const fnLogin = async() => {
      try{
      const [isInValid, data]: any = handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            updateStoreData(dispatch, 'LOADER', true)
          const res = await Ajax.post("auth/login",{data})
          if (res?.data?.length > 0){
            updateStoreData(dispatch, 'LOGIN', true)
            console.log("login data",res)
        }else {
          updateStoreData(dispatch,'TOASTER',{
            isShowToaster:true,
            toasterMsg:'check entered uid or pwd',
            color:'red'
        })
    
        }
      }catch (ex) {

      }finally{
        updateStoreData(dispatch, 'LOADER', false)
      }
    }
    
    const handleChange = (eve: any) => {
      handleFieldLevelValidation(eve, inputControls, setInputControls)
  }
    
  return (
    <div className='container-fluid'> 
       <h3 className = 'mt-3 wb-3 text-center'>Login</h3>
       {
        inputControls.map((obj,name) => {
                    return <Input key={name} {...obj} handleChange={handleChange}/>
                  })
            }
       <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary' onClick={fnLogin}>Login</button>
                </div>
            </div>

        </div>
  )
}