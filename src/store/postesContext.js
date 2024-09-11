
import { createContext, useState } from "react";

export const posterContext = createContext(null)

function Post({ children }) {
    const [posterDetails, setPosterDetails] = useState();

    return (
        <posterContext.Provider value={{ posterDetails, setPosterDetails }}>
            {children}
        </posterContext.Provider>
    );
}



export default Post