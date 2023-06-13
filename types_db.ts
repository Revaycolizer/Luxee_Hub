export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      category: {
        Row: {
          created_at: string
          id: number
          likes: string | null
          selectedValue: string
          user: string
          vname: string
        }
        Insert: {
          created_at?: string
          id?: number
          likes?: string | null
          selectedValue: string
          user: string
          vname: string
        }
        Update: {
          created_at?: string
          id?: number
          likes?: string | null
          selectedValue?: string
          user?: string
          vname?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          follow_id: string
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          follow_id: string
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          follow_id?: string
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          id: string
          name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          email?: string | null
          id: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
