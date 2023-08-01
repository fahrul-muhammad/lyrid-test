import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';

const dispatch = useDispatch<AppDispatch>();

export {dispatch, useSelector};
