import React from 'react'
import { getDefaultOptions } from 'UTILS/options'
import { SwConfigOptions } from 'TYPES/Widget'

const ThemeContext = React.createContext<SwConfigOptions>(getDefaultOptions())

export default ThemeContext
