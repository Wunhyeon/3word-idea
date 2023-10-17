export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_visible: boolean
          round: number | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          round?: number | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          round?: number | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          nick_name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          nick_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          nick_name?: string | null
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
      words: {
        Row: {
          content: string
          created_at: string
          id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      words_ideas: {
        Row: {
          created_at: string
          id: string
          ideas_id: string
          words_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ideas_id: string
          words_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ideas_id?: string
          words_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "words_ideas_ideas_id_fkey"
            columns: ["ideas_id"]
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "words_ideas_words_id_fkey"
            columns: ["words_id"]
            referencedRelation: "words"
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
