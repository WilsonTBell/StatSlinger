import { createRoot } from "react-dom/client"
import './index.css';
import { StatSlinger } from './components/StatSlinger';
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <StatSlinger />
  </BrowserRouter>
);

