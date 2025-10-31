import { sql } from "../config/db.js";

export async function getGoalsByUserId(req, res) {
  try {
    // Uses Object destructing to extract userID from request URL
    const { user_id } = req.params;

    // gets all goals from user and orders them with highest progress at the top
    const goals = await sql`
            SELECT * FROM goals WHERE user_id = ${user_id} ORDER BY progress DESC
        `;

    res.status(200).json(goals);
  } catch (error) {
    console.log("Error getting the goals: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createGoal(req, res) {
  try {
    // Extracts data from body of json
    const { goal_title, target_amount, category, deadline, user_id } = req.body;

    if (!goal_title || target_amount === undefined || !category || !userId) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const goal = await sql`
            INSERT INTO goals(goal_title, target_amount, category, deadline, user_id)
            VALUES (${goal_title}, ${target_amount}, ${category}, ${deadline}, ${user_id})
            RETURNING *
        `;

    console.log(goal[0]);
    res.status(201).json(goal[0]);
  } catch (error) {
    console.log("Error creating the goal: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteGoal(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid Goal Id" });
    }

    const deleted = await sql`
            DELETE FROM goals WHERE id = ${id}
            RETURNING *
        `;

    if (deleted.length == 0) {
      res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(deleted);
  } catch (error) {
    console.log("Error deleting the transaction: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateGoal(req, res) {
  try {
    const { id } = req.params;

    const { goal_title, target_amount, category, deadline, user_id } = req.body;

    if (isNaN(parseInt(id))) {
      res.status(400).json({ message: "Invalid Goal Id" });
    }

    if (!goal_title || target_amount === undefined || !category || !userId) {
      return res.status(400).json({ message: "No fields given to update" });
    }

    // Building dynamic Update Query
    const goal_fields = [];
    if (goal_title !== undefined)
      goal_fields.push(sql`goal_title = ${goal_title}`);
    if (target_amount !== undefined)
      target_amount.push(sql`target_amount = ${target_amount}`);
    if (category !== undefined) category.push(sql`category = ${category}`);
    if (deadline !== undefined) deadline.push(sql`deadline = ${deadline}`);

    // Perform Update Query
    const [updatedGoal] = await sql`
            UPDATE goals
            SET ${sql.join(goal_fields, sql`, `)}
            WHERE id = ${id}
            RETURNING *
        `;

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.log("Error updating goal: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
