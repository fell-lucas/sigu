import { router } from '../../t';
import { createMaterial } from './createMaterial';
import { getAllMaterials } from './getAllMaterials';

export const courseMaterialRouter = router({
	getAll: getAllMaterials,
	create: createMaterial
});
