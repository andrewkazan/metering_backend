import { Schema, model } from 'mongoose';

const ErrorSchema = new Schema(
  {
    error: { type: String, default: null },
    time: { type: Date, default: null },
  },
  { _id: false },
);

const ValueUnitSchema = new Schema(
  {
    value: { type: String, default: null },
    unit: { type: String, default: null },
  },
  { _id: false },
);

const TariffSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    unit: { type: String, required: true },
  },
  { _id: false },
);

const PowerNetParametersDataSchema = new Schema(
  {
    voltage: { type: ValueUnitSchema, default: null },
    current: { type: ValueUnitSchema, default: null },
    power: { type: ValueUnitSchema, default: null },
  },
  { _id: false },
);

const schema = Schema(
  {
    dateTime: {
      data: { type: Date, default: null },
      error: { type: ErrorSchema, default: null },
    },
    limitPower: {
      data: { type: ValueUnitSchema, default: null },
      error: { type: ErrorSchema, default: null },
    },
    limitEnergy: {
      data: { type: ValueUnitSchema, default: null },
      error: { type: ErrorSchema, default: null },
    },
    powerReading: {
      data: { type: ValueUnitSchema, default: null },
      error: { type: ErrorSchema, default: null },
    },
    valueOfEnergy: {
      data: { type: [TariffSchema], default: [] },
      error: { type: ErrorSchema, default: null },
    },
    batteryVoltage: {
      data: { type: ValueUnitSchema, default: null },
      error: { type: ErrorSchema, default: null },
    },
    powerNetParameters: {
      data: { type: PowerNetParametersDataSchema, default: null },
      error: { type: ErrorSchema, default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const MeteringDataItemSchema = model('MeteringDataItem', schema);
