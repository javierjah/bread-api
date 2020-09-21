import db from '../models';

class BreadService {
  static async getAllBreads() {
    try {
      return await db.Bread.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addBread(newBread) {
    try {
      return await db.Bread.create(newBread);
    } catch (error) {
      throw error;
    }
  }

  static async updateBread(id, updateBread) {
    try {
      const breadToUpdate = await db.Bread.findOne({
        where: { id: Number(id) },
      });

      if (breadToUpdate) {
        await db.Bread.update(updateBread, { where: { id: Number(id) } });

        return updateBread;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABread(id) {
    try {
      const theBread = await db.Bread.findOne({
        where: { id: Number(id) },
      });

      return theBread;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBread(id) {
    try {
      const breadToDelete = await db.Bread.findOne({ where: { id: Number(id) } });

      if (breadToDelete) {
        const deletedBread = await db.Bread.destroy({
          where: { id: Number(id) },
        });
        return deletedBread;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BreadService;
