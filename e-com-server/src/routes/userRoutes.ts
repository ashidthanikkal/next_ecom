import { Router } from "express";
import { updateProfile,approveSeller, getProfile, getSellers, disapproveSeller } from "../controllers/userController";
import auth from "../middleware/authMiddleware";

const router = Router();


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Returns the logged-in user's profile (without password or refresh tokens).
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 651d4e6b12c3a2b6f8c12a34
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: +91-9876543210
 *       401:
 *         description: Unauthorized (no token provided)
 *       404:
 *         description: User not found
 */
router.get("/profile", auth, getProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               phone:
 *                 type: string
 *                 example: "+911234567890"
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Profile updated"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/profile",auth,updateProfile);


/**
 * @swagger
 * /api/users/sellers:
 *   get:
 *     summary: Get all sellers
 *     description: Returns a list of all users with the seller role.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sellers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 651d4e6b12c3a2b6f8c12a34
 *                   username:
 *                     type: string
 *                     example: seller123
 *                   email:
 *                     type: string
 *                     example: seller@example.com
 *                   phone:
 *                     type: string
 *                     example: +91-9876543210
 *                   role:
 *                     type: string
 *                     example: seller
 *       401:
 *         description: Unauthorized (no token provided)
 *       500:
 *         description: Server error
 */
router.get("/sellers",auth, getSellers);

/**
 * @swagger
 * /api/users/sellers/{id}/approve:
 *   put:
 *     summary: Approve a seller
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Seller user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Seller approved successfully"
 *       404:
 *         description: Seller not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Seller not found"
 *       403:
 *         description: Access denied (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Access denied"
 *       500:
 *         description: Internal server error
 */
router.put("/sellers/:id/approve", auth, approveSeller);

/**
 * @swagger
 * /api/users/sellers/{id}/disapprove:
 *   put:
 *     summary: Disapprove a seller
 *     description: Sets sellerApproved to false for the given seller ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Seller ID
 *     responses:
 *       200:
 *         description: Seller disapproved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Seller disapproved successfully
 *       401:
 *         description: Unauthorized (no token provided)
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Server error
 */
router.put("/sellers/:id/disapprove", auth, disapproveSeller);





export default router;
