/**
 * @openapi
 * /starbucks:
 *   get:
 *     summary:  커피 메뉴 리스트 가져오기
 *     tags: [starbucks]
 *     responses:
 *       200:
 *         description: 성공
 *
 *
 *
 */

/**
 * @openapi
 * /users:
 *  get:
 *      summary: 회원정보 리스트
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  properties:
 *                      email:
 *                       type: string
 *                       example: aaa@gmil.com
 *                      name:
 *                        type: string
 *                        example: 철수
 *                      phone:
 *                        type: string
 *                        example: 010-1234-5678
 *                      prefer:
 *                        type: string
 *                        example: https://naver.com
 *
 *
 *
 *
 *
 *
 *
 */
