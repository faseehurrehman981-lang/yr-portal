import { pgTable, uuid, varchar, text, timestamp, decimal, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["CUSTOMER", "DRIVER", "ADMIN"]);
export const vehicleTypeEnum = pgEnum("vehicle_type", ["MINI", "RIDE", "BIKE"]);
export const vehicleStatusEnum = pgEnum("vehicle_status", ["ACTIVE", "INACTIVE"]);
export const rideStatusEnum = pgEnum("ride_status", ["REQUESTED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);
export const paymentMethodEnum = pgEnum("payment_method", ["CASH", "ONLINE"]);
export const paymentStatusEnum = pgEnum("payment_status", ["PENDING", "COMPLETED", "FAILED"]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").default("CUSTOMER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Vehicles Table
export const vehicles = pgTable("vehicles", {
  id: uuid("id").defaultRandom().primaryKey(),
  driverId: uuid("driver_id").references(() => users.id).notNull(),
  type: vehicleTypeEnum("type").notNull(),
  make: varchar("make", { length: 50 }).notNull(),
  model: varchar("model", { length: 50 }).notNull(),
  year: varchar("year", { length: 4 }).notNull(),
  licensePlate: varchar("license_plate", { length: 20 }).notNull().unique(),
  status: vehicleStatusEnum("status").default("INACTIVE").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Rides Table
export const rides = pgTable("rides", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerId: uuid("customer_id").references(() => users.id).notNull(),
  driverId: uuid("driver_id").references(() => users.id),
  pickupLocation: text("pickup_location").notNull(),
  destination: text("destination").notNull(),
  status: rideStatusEnum("status").default("REQUESTED").notNull(),
  fare: decimal("fare", { precision: 10, scale: 2 }),
  rideType: vehicleTypeEnum("ride_type").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("PENDING").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Payments Table
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  rideId: uuid("ride_id").references(() => rides.id).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  method: paymentMethodEnum("method").notNull(),
  status: paymentStatusEnum("status").default("COMPLETED").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
