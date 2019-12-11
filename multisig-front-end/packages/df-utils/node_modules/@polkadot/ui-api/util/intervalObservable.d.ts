/// <reference types="react" />
import { CallState } from '../types';
export default function intervalSubscribe<T, Props, State extends CallState>(that: React.Component<Props, State>): import("rxjs").Subscription;
