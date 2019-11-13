import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import MiniArea from './MiniArea';
import Bar from './Bar';
import Pie from './Pie';
import TimelineChart from './TimelineChart';
import TagCloud from './TagCloud';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

export { ChartCard, Field, MiniArea, Bar, Pie, yuan, TimelineChart, TagCloud };
