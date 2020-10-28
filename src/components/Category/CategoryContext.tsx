import React from 'react';
import {Category} from "../../types";

export const CategoryContext = React.createContext<{category:Category | undefined}>({category:undefined});