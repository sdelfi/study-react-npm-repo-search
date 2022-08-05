import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { repositoriesActions } from '../state'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(repositoriesActions, dispatch)
}
