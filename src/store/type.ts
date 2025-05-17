import { useDispatch, useSelector } from 'react-redux';
import type store from '.';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export type { RootState, AppDispatch };

export { useAppDispatch, useAppSelector };
