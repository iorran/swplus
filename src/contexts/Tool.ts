import { atom } from 'jotai'

export type ICurrentToolAtom = "line" | "dot" | "circle" | "export";

export const CURRENT_TOOL_ATOM = atom<ICurrentToolAtom>("export");