#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]


#[tauri::command]
fn my_custom_command(invoke_message: String) {
    println!("I was invoked from JS, with this message: {}", invoke_message);
}

// #[tauri::command]
// async fn open_docs(handle: tauri::AppHandle) {
//     tauri::WindowBuilder::new(
//         &handle,
//         "external", /* the unique window.tsx label */
//         tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
//     ).build().unwrap();
// }

fn main() {
    tauri::Builder::default()
/*        .setup(|app| {
            let handle = app.handle();
            std::thread::spawn(move || {
                tauri::WindowBuilder::new(
                    &handle,
                    "local",
                    tauri::WindowUrl::App("index.html".into()),
                ).build().unwrap();
            });
            Ok(())
        })*/
        .invoke_handler(tauri::generate_handler![my_custom_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

