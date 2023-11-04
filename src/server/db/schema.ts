// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  int,
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
  json,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `create_t3_app_test_${name}`);

export const items = mysqlTable(
  "item",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    type: varchar("type", { length: 256 }),
    rarity: varchar("rarity", { length: 256 }),
    cost: int("cost"),
    image_url: varchar("image_url", { length: 256 }),
    stats: json('stats').$type<{ foo: string }>(),
    attributes: varchar("attributes", { length: 512 }),
    effects: json('effects').$type<{ foo: {} }>(),
  },
  (tableColumns) => ({  
    nameIndex: index("name_idx").on(tableColumns.name),
  })
);

export const recipes = mysqlTable(
  "recipe",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    crafted_item_id: int("crafted_item_id"),
    recipe_items: varchar("recipe_items", { length: 256 }),
  },
  (tableColumns) => ({  
    crafted_item_id_index: index("crafted_item_id_index").on(tableColumns.crafted_item_id),
  })
);
