// Скрипт для удаления старых ENUM типов из базы данных
import pg from 'pg'
const { Client } = pg

const DATABASE_URI = process.env.DATABASE_URI || 'postgresql://neondb_owner:npg_GoZsct7l2Jre@ep-sparkling-sun-abf0z3iz-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require'

async function fixEnums() {
  const client = new Client({
    connectionString: DATABASE_URI,
  })

  try {
    await client.connect()
    console.log('✅ Подключено к базе данных')

    // Удаляем старые ENUM типы
    await client.query('DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_button_custom_color" CASCADE')
    console.log('✅ Удален enum_pages_blocks_hero_button_custom_color')

    await client.query('DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_button_text_color" CASCADE')
    console.log('✅ Удален enum_pages_blocks_hero_button_text_color')

    console.log('\n✅ Все ENUM типы успешно удалены!')
    console.log('🔄 Перезапустите приложение, Payload создаст новые типы автоматически')
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixEnums()

