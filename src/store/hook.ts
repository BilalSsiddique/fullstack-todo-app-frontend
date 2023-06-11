import React, { useState } from 'react'
import { useEffect } from 'react'

import {TypedUseSelectorHook,useDispatch,useSelector} from 'react-redux'

import type {RootState,AppDispatch} from './store'
import { Todo } from './slice/todoSlice'


export const useAppDispatch =  ( ) => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


