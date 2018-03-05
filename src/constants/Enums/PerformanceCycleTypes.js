import {Enum} from './enumify';

// None = 0,
//   [EnumDisplay("Weekly")]
// Weekly,
//   [EnumDisplay("Block")]
// Block,
//   [EnumDisplay("Hour")]
// Hour,
//   [EnumDisplay("Day of Week")]
// DayOfWeek,
//   [EnumDisplay("Month")]
// Month,
//   [EnumDisplay("Day")]
// Day,
//   [EnumDisplay("Security")]
// Security,
//   [EnumDisplay("All")]
// All

export class PerformanceCycleTypes extends Enum {}
PerformanceCycleTypes.initEnum(new Map([['None', 'None'], ['Weekly', 'Weekly'], ['Block', 'Block'], ['Hour', 'Hour'], ['DayOfWeek', 'Day of Week'], ['Month', 'Month'], ['Day', 'Day'], ['Security', 'Security'], ['All', 'All']]));

export default PerformanceCycleTypes;
