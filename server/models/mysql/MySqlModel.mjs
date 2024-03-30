import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Sql connection
const connection = mysql.createConnection(process.env.DATABASE_URL);

export const Get_condition_products = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM condition_products WHERE gameId = ?',
      [gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Add_condition_products = (productId, seller) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO condition_products (productId, seller) VALUES (?, ?)',
      [productId, seller],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_selected_giveaways = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM selected_giveaways WHERE gameId = ?',
      [gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_all_selected_giveaways = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM selected_giveaways',
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_game_condition = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM game_condition WHERE gameId = ?',
      [gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Update_game_condition = (sqlCommand, parameter) => {
  return new Promise((resolve, reject) => {
    connection.query(
      sqlCommand,
      parameter,
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_discount_created = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM discount_created WHERE gameId = ?',
      [gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_all_discount = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM discount_created',
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_game_profile = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM game_profile WHERE gameId = ?',
      [gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Update_game_name = (gameId, gameName, dateLastEdited) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE game_profile SET gameName = ?, dateLastEdited = ? WHERE gameId = ?',
      [gameName, dateLastEdited, gameId],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_active_gameId = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT gameId FROM game_profile WHERE status = ?',
      ['active'],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_condition_products_with_multiple_gameId = (gameIds) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM condition_products WHERE gameId IN (?)',
      [gameIds],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const Insert_game_history = (gameId, gameName, orderNumber, user_gameCondition, user_recipientName, user_phoneNumber, user_gameStatus) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO game_history (gameId, gameName, orderNumber, user_gameCondition, user_recipientName, user_phoneNumber, user_gameStatus) '
      + 'VALUES (?, ?, ?, ?, ?, ?, ?)',
      [gameId, gameName, orderNumber, user_gameCondition, user_recipientName, user_phoneNumber, user_gameStatus],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const Update_game_history = (user_gameStatus, user_reward_type, user_reward_id, date, orderNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE game_history SET user_gameStatus = ?, user_reward_type = ?, user_reward_id = ? , date = ? WHERE orderNumber = ?',
      [user_gameStatus, user_reward_type, user_reward_id, date, orderNumber],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const Insert_order_history = (user_recipientName, user_phoneNumber, orderNumber, totalPrice, orderItems) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO order_history (user_recipientName, user_phoneNumber, orderNumber, totalPrice, orderItems) '
      + 'VALUES (?, ?, ?, ?, ?)',
      [user_recipientName, user_phoneNumber, orderNumber, totalPrice, orderItems],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const Check_IsNewCustomer = (user_recipientName, user_phoneNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT COUNT(*) AS order_count FROM order_history WHERE user_recipientName = ? AND user_phoneNumber = ?',
      [user_recipientName, user_phoneNumber],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          if (result[0].order_count > 0) {
            resolve(false);
          }
          else {
            resolve(true);
          }
        }
      }
    )
  });
};

export const Get_game_history = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM game_history',
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const Insert_selected_giveaways = (gameId, productIds) => {
  // Convert productIds array into an array of arrays to use with MySQL multiple value insert syntax
  const values = productIds.map(productId => [gameId, productId]);
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO selected_giveaways (gameId, productId) VALUES ?',
      [values],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};


export const Delete_selected_giveaways_with_gameId = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM selected_giveaways WHERE gameId = ?',
      [gameId],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Insert_coupon_created = (code, value, startDate, endDate, quantity, limitPerUser, minPurChaseQuantity, termsAndConditions) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO coupon_created (code, value, startDate, endDate, quantity, limitPerUser, minPurChaseQuantity, termsAndConditions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [code, value, startDate, endDate, quantity, limitPerUser, minPurChaseQuantity, termsAndConditions],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_game_coupon_with_gameId = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM game_coupon WHERE gameId = ?',
      [gameId],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_coupon_created = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM coupon_created',
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_latest_gameId = (gameType) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `
      SELECT CONCAT(?, '-', LPAD(IFNULL(MAX(CAST(SUBSTRING(gameId, LENGTH(?) + 2) AS UNSIGNED)), 0) + 1, 3, '0')) AS newGameId
      FROM game_profile
      WHERE gameId LIKE CONCAT(?, '-%');;
      `,
      [gameType, gameType, gameType],
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          const newGameId = result[0].newGameId;
          resolve(newGameId);
        }
      }
    );
  });
};

export const Insert_game_profile = (gameId, gameName, gameType, dateCreated, status) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO game_profile (gameId, gameName, gameType, dateCreated, status) VALUES (?, ?, ?, ?, ?)',
      [gameId, gameName, gameType, dateCreated, status],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Insert_game_condition = (gameId, condition) => {
  return new Promise((resolve, reject) => {
    const {orderAmount_state, conditionProduct_state, inviteFriend_state, newCustomer_state, newCustomer_require_minimum_state, limitTicket_state} = condition;
    connection.query(
      `INSERT INTO game_condition 
      (gameId, orderAmount_state, conditionProduct_state, inviteFriend_state, newCustomer_state, newCustomer_require_minimum_state, limitTicket_state) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [gameId, orderAmount_state, conditionProduct_state, inviteFriend_state, newCustomer_state, newCustomer_require_minimum_state, limitTicket_state],
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Get_all_game_profile = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM game_profile',
      async function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    )
  });
};

export const Update_multiple_games = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(
      query,
      function (error, result, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
