import axios from 'axios';
import IDesign from "../../../common/models/design";
import Design from '../models/design';


const INDEX_URL = "http://localhost:5000/designs"

class DesignsService {
  design: Design | null;
  config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
  }
  
  constructor(design?: Design) {
    this.design = design || null;
  }

  async index(): Promise<Array<Design>> {
    const response = await axios.get(INDEX_URL, this.config);
    console.log("API DESIGNS INDEX RESPONSE: ", response)
    const designs = response.data.map((design: IDesign) => new Design(design));
    return designs;
  }

  async create(design: Design) {
    await axios.post(INDEX_URL, design.attributes, this.config);
  }

  async update(design: Design) {
    const id = design.attributes._id;
    console.log("UPDATE ID: ", id)
    delete design.attributes._id;
    console.log("UPDATE ID: ", id)
    await axios.put(`${INDEX_URL}/${id}`, design.attributes, this.config)
  }

  async delete(design: Design) {
    const id = design.attributes._id;
    console.log("DELETE ID: ", id);
    await axios.delete(`${INDEX_URL}/${id}`, this.config);
  }
}

export default DesignsService;