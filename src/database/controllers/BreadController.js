import BreadService from '../services/BreadService';
import RestResponses from '../utils/RestResponses';

const RR = new RestResponses();

class BreadController {
  static async getAllBreads(req, res) {
    try {
      const allBreads = await BreadService.getAllBreads();
      if (allBreads.length > 0) {
        RR.setSuccess(200, 'Breads retrieved', allBreads);
      } else {
        RR.setSuccess(200, 'No bread found');
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error);
      return RR.send(res);
    }
  }

  static async addBread(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      RR.setError(400, 'Please provide complete details');
      return RR.send(res);
    }
    const newBread = req.body;
    try {
      const createdBread = await BreadService.addBread(newBread);
      RR.setSuccess(201, 'Bread Added!', createdBread);
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error.message);
      return RR.send(res);
    }
  }

  static async updatedBread(req, res) {
    const alteredBread = req.body;
    const { id } = req.params;
    if (!id) {
      RR.setError(400, 'Please input a valid numeric value');
      return RR.send(res);
    }
    try {
      const updateBread = await BreadService.updateBread(id, alteredBread);
      if (!updateBread) {
        RR.setError(404, `Cannot find bread with the id: ${id}`);
      } else {
        RR.setSuccess(200, 'Bread updated', updateBread);
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(404, error);
      return RR.send(res);
    }
  }

  static async getABread(req, res) {
    const { id } = req.params;

    if (!id) {
      RR.setError(400, 'Please input a valid numeric value');
      return RR.send(res);
    }

    try {
      const theBread = await BreadService.getABread(id);

      if (!theBread) {
        RR.setError(404, `Cannot find bread with the id ${id}`);
      } else {
        RR.setSuccess(200, 'Found Bread', theBread);
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(404, error);
      return RR.send(res);
    }
  }

  static async deleteBread(req, res) {
    const { id } = req.params;

    if (!id) {
      RR.setError(400, 'Please provide a numeric value');
      return RR.send(res);
    }

    try {
      const breadToDelete = await BreadService.deleteBread(id);

      if (breadToDelete) {
        RR.setSuccess(200, 'Bread deleted');
      } else {
        RR.setError(404, `Bread with the id ${id} cannot be found`);
      }
      return RR.send(res);
    } catch (error) {
      RR.setError(400, error);
      return RR.send(res);
    }
  }
}

export default BreadController;
